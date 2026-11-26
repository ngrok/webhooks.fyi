---
title: Paystack Webhook Specs, Events, and Examples
pageTitle: Paystack Webhooks Specs | Examples | How to integrate
description: Webhook specifications for Paystack including supported events, security headers, delivery behavior, and official documentation.
---

Paystack uses webhooks to notify your server when the status of an API request changes, such as a successful charge, a failed transfer, or a processed refund.

{% table %}
---
* ## Specifications
* - **[HMAC Authentication](/security/hmac)**
 - **[Replay Prevention](/security/replay-prevention)**: ✅
 - **[Forward Compatibility](/ops-experience/versioning)**: ✅
 - **[Zero Downtime Rotation](/ops-experience/key-rotation)**: ✅
---
* ## Supported Events
* - **[Official Doc ↗](https://paystack.com/docs/payments/webhooks/#types-of-events)**
---
* ## Security Headers
* - **Signature Header**: `Paystack-Signature`
 - **Hash**: sha512
 - **Encode**: hex
 - **Signature Header Format**: `t=timestamp,v1=<key_id>:<hex signature>`
 - **payload**: `timestamp.request_body`
 - **Timestamp Format**: Unix Date
 > Note: `t` is the signing time in Unix seconds. Each `v1` value is `<key_id>:<hex signature>`. The key id starts with `whk_`. The signature is a lowercase hex HMAC-SHA512, 128 characters long. An event can carry more than one `v1`. Ignore any other fields in the header. The HMAC key is your webhook signing secret (`whsec_`). Reject the event if `t` is more than 300 seconds before or after your server time.
 - **Legacy Signature Header**: `x-paystack-signature`
 > Note: While your integration has a secret key, events also carry `x-paystack-signature`. That value is an HMAC-SHA512 of the raw request body only, signed with your secret key, with no timestamp. Paystack stops sending this header once you delete your secret key. If events do not yet carry `Paystack-Signature`, generate a signing secret and keep verifying `x-paystack-signature` until they do.
---
* ## Delivery
* - **Acknowledge with**: `200 OK`
 - **Live retries**: every 3 minutes for the first 4 tries, then hourly for the next 72 hours
 - **Test retries**: hourly for 10 hours, with a request timeout of 30 seconds
 - **IP Origins for allowlist**: `52.31.139.75`, `52.49.173.169`, `52.214.14.220` (test and live)
---
* ## Documentation
* - [Official Doc ↗](https://paystack.com/docs/payments/webhooks/)
 - [Types of events ↗](https://paystack.com/docs/payments/webhooks/#types-of-events)
 - [Webhook Events API ↗](https://paystack.com/docs/api/webhook-events/)
{% /table %}

---

## Sample Validation

```js
const crypto = require('crypto')
const sigHeader = 'paystack-signature'
const hashAlgo = 'sha512'
const encode = 'hex'
const hmacSecrets = [
    process.env.PAYSTACK_WEBHOOK_SECRET,
    process.env.PAYSTACK_WEBHOOK_SECRET_PREVIOUS
].filter(Boolean)
const TOLERANCE_SECONDS = 300
app.post('/paystack-webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const header = req.get(sigHeader) || ''
    const parts = header.split(',')
    const timestampPart = parts.find((part) => part.trim().startsWith('t='))
    const signatures = parts.filter((part) => part.trim().startsWith('v1='))

    if (!timestampPart || signatures.length === 0) {
        return res.status(401).send('Request unauthorized')
    }

    const timestamp = timestampPart.trim().substring(2)
    if (!/^[0-9]+$/.test(timestamp)) {
        return res.status(401).send('Request unauthorized')
    }

    const now = Math.floor(Date.now() / 1000)
    if (Math.abs(now - Number(timestamp)) > TOLERANCE_SECONDS) {
        return res.status(403).send('Request expired')
    }

    const matched = hmacSecrets.some((secret) => {
        const expected = crypto
            .createHmac(hashAlgo, secret)
            .update(timestamp + '.')
            .update(req.body)
            .digest(encode)

        return signatures.some((entry) => {
            const value = entry.trim().substring(3)
            const colon = value.indexOf(':')
            const hex = colon === -1 ? '' : value.substring(colon + 1)
            if (!/^[0-9a-f]{128}$/.test(hex)) {
                return false
            }
            try {
                return crypto.timingSafeEqual(
                    Buffer.from(expected, 'hex'),
                    Buffer.from(hex, 'hex')
                )
            } catch (err) {
                return false
            }
        })
    })

    if (!matched) {
        return res.status(401).send('Request unauthorized')
    }

    res.status(200).send('Success')
})
```

## Sample Validation for x-paystack-signature

Use this only if events do not yet carry `Paystack-Signature`.

```js
const crypto = require('crypto')
const sigHeader = 'x-paystack-signature'
const hashAlgo = 'sha512'
const encode = 'hex'
const hmacSecret = process.env.SECRET_KEY
app.post('/paystack-webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const expected = crypto
        .createHmac(hashAlgo, hmacSecret)
        .update(req.body)
        .digest(encode)
    const signature = req.headers[sigHeader] || ''
    if (
        !/^[0-9a-f]{128}$/.test(signature) ||
        !crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'))
    ) {
        return res.status(401).send('Request unauthorized')
    }
    res.status(200).send('Success')
})
```
