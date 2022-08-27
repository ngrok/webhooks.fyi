---
title: Zoom
pageTitle: Zoom | Webhook Specs | How to integrate
description: Webhook specificactions for Zoom including Documentation, Events Supported, Sample Apps, Security Specs, and Operations
--- 

![zoom](https://us01st-cf.zoom.us/zoom.ico)

Zoom uses webhooks to notify third-party apps of events such as Meetings, Webinars,Recordings, User Activity, Billing, and Chat Messages created.

- [Documentation ↗](https://marketplace.zoom.us/docs/api-reference/webhook-reference/#verify-webhook-events)
- [Events Supported ↗](https://marketplace.zoom.us/docs/api-reference/webhook-reference/#objects-actions-and-events)
- [IP Origins for whitelist ↗](https://marketplace.zoom.us/docs/api-reference/webhook-reference/#ip-addresses)
- [Sample App ↗](https://github.com/zoom/webhook-sample-node.js)

## Security

- **Authentication**: [HMAC](/security/hmac)
- **Hash**: sha256
- **Encode**: hex
- **Signature Header**: `x-zm-signature`
- **[Replay Prevention](/security/replay-prevention)**: ✅
- **Timestamp Header**: `x-zm-request-timestamp`
- **Timestamp Format**: Unix Date

---

## Operational Experience

- **[Rotation](/ops-experience/key-rotation)**: ❌
- **[Versioning](/ops-experience/versioning)**: ✅

---

## Sample Validation

```js
const crypto = require('crypto')
const timeHeader = 'x-zm-request-timestamp'
const sigHeader = 'x-zm-signature'
const hashAlgo = 'sha256'
const encode = 'hex'
const hmacSecret = process.env.WEBHOOK_SECRET
app.post('/zoom-webhook', (req, res) => {
    //01: Validate replay prevention with 5 minute timeframe
    const requestTimestamp = req.headers[timeHeader] * 1000;
    const tolerance = Date.now() - (5 * 60 * 1000);
    if (requestTimestamp < tolerance) {
        res.status(403).send('Request expired')
    }else{
        //02: Validate signature
        const message = `v0:${req.headers[timeHeader]}:${JSON.stringify(req.body)}`
        const digest = crypto.createHmac(hashAlgo, hmacSecret).update(message).digest(encode)
        if (request.headers[sigHeader] !== digest) {
            res.status(401).send('Request unauthorized')
        }else{
            //03: Process message
            res.json({ message: "Success" })
        }
    }
})
```
