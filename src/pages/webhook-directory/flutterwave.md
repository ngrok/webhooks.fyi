---
title: Flutterwave Webhook Specs, Events, and Examples
pageTitle: Flutterwave Webhooks Specs | Examples | How to integrate
description: Webhook specifications for Flutterwave including security headers, delivery behavior, and official documentation.
---

Flutterwave uses webhooks to notify your server when a payment, payout, or other event happens on your account, such as a completed charge or a failed transaction.

Flutterwave publishes two official webhook guides. The v4 docs sign the raw body with HMAC-SHA256 and send the digest in `flutterwave-signature`. The docs at `/docs/webhooks` send the dashboard secret hash in `verif-hash` and ask you to compare that header to the secret you configured. The directory row uses the v4 HMAC scheme. Both methods are documented below.

{% table %}
---
* ## Specifications
* - **[HMAC Authentication](/security/hmac)** (v4 docs)
 - **[Replay Prevention](/security/replay-prevention)**: ❌
 - **[Forward Compatibility](/ops-experience/versioning)**: ❌
 - **[Zero Downtime Rotation](/ops-experience/key-rotation)**: ❌
---
* ## Supported Events
* - **[Official Doc ↗](https://developer.flutterwave.com/docs/webhooks)**
 - **[v4 Official Doc ↗](https://developer.flutterwave.com/v4/docs/webhooks)**
---
* ## Security Headers (v4 docs)
* - **Signature Header**: `flutterwave-signature`
 - **Hash**: sha256
 - **Encode**: base64
 - **payload**: `request_body`
 > Note: Flutterwave uses the secret hash from your dashboard as the HMAC key. Compute HMAC-SHA256 over the raw request body and compare the base64 digest to `flutterwave-signature`.
---
* ## Security Headers (docs at /docs/webhooks)
* - **Signature Header**: `verif-hash`
 > Note: If you set a secret hash, Flutterwave includes it in `verif-hash`. Check that the header is present and that it matches the secret hash you set. This is not an HMAC of the body.
---
* ## Delivery
* - **Acknowledge with**: `200 OK`. Any other status, including 3xx, is treated as a failure. Flutterwave does not use the response body or headers.
 - **Timeout**: 60 seconds
 - **Retries**: if webhook retries are enabled on the dashboard, 3 retries with a 30-minute interval between attempts
 - **IP Origins for allowlist**: the docs at `/docs/webhooks` state that Flutterwave IP addresses are dynamic and may change, and recommend signature verification instead of strict IP whitelisting. The v4 webhook docs page does not publish an IP allowlist.
---
* ## Documentation
* - [Official Doc ↗](https://developer.flutterwave.com/docs/webhooks)
 - [v4 Official Doc ↗](https://developer.flutterwave.com/v4/docs/webhooks)
{% /table %}

---

## Sample Validation (v4 flutterwave-signature)

```js
const crypto = require('crypto')
const bodyParser = require('body-parser')
const sigHeader = 'flutterwave-signature'
const hashAlgo = 'sha256'
const encode = 'base64'
const hmacSecret = process.env.FLW_SECRET_HASH
app.post('/flutterwave-webhook', bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString()
    }
}), (req, res) => {
    const signature = req.headers[sigHeader] || ''
    const digest = crypto
        .createHmac(hashAlgo, hmacSecret)
        .update(req.rawBody)
        .digest(encode)
    const signatureBuffer = Buffer.from(signature)
    const digestBuffer = Buffer.from(digest)
    if (
        signatureBuffer.length !== digestBuffer.length ||
        !crypto.timingSafeEqual(signatureBuffer, digestBuffer)
    ) {
        return res.status(401).send('Request unauthorized')
    }
    res.status(200).send('Success')
})
```

## Sample Validation (verif-hash)

```js
const crypto = require('crypto')
const sigHeader = 'verif-hash'
const secretHash = process.env.FLW_SECRET_HASH
app.post('/flutterwave-webhook', (req, res) => {
    const signature = req.get(sigHeader)
    if (typeof signature !== 'string' || typeof secretHash !== 'string') {
        return res.status(401).send('Request unauthorized')
    }
    const signatureBuffer = Buffer.from(signature)
    const secretBuffer = Buffer.from(secretHash)
    if (
        signatureBuffer.length !== secretBuffer.length ||
        !crypto.timingSafeEqual(signatureBuffer, secretBuffer)
    ) {
        return res.status(401).send('Request unauthorized')
    }
    res.status(200).send('Success')
})
```
