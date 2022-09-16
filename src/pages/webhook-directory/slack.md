---
title: Slack Webhook Specs, Events, and Examples
pageTitle: Slack Webhooks Specs | Examples | How to integrate
description: Outgoing webhook specificactions for Slack including Supported Events, Example Apps, Security Specs, and Documentations.
--- 

Slack uses outgoing webhooks to notify third-party apps of events such as messages sent, conversations started, files uploaded, and channels archived. 

{% table %}
---
* ## Specifications
* - **[HMAC Authentication](/security/hmac)**
  - **[Replay Prevention](/security/replay-prevention)**: ✅
  - **[Forward Compatibility](/ops-experience/versioning)**: ✅
  - **[Zero Downtime Rotation](/ops-experience/key-rotation)**: ❌
---
* ## Supported Events
* - **[Official Doc ↗](https://api.slack.com/events?filter=Events)**
---
* ## Security Headers
* - **Signature Header**: `X-Slack-Signature`
  - **Hash**: sha256
  - **Encode**: hex
  - **payload**: `v0:timestamp:request_body`
  - **Timestamp Header**: `X-Slack-Request-Timestamp`
  - **Timestamp Format**: Unix Date
---
* ## Documentation
* - [Official Doc ↗](https://api.slack.com/authentication/verifying-requests-from-slack)
  - [Official SDKs ↗](https://api.slack.com/authentication/verifying-requests-from-slack#sdk_support)
---
* ## SDKs and Sample Code
* - [Slack Bolt SDK - JavaScript ↗](https://github.com/slackapi/bolt-js/blob/main/src/receivers/verify-request.ts)
  - [Slack Bolt SDK - Python ↗](https://github.com/slackapi/bolt-python/blob/main/slack_bolt/middleware/request_verification/async_request_verification.py)
  - [Slack Bolt SDK - Java ↗](https://github.com/slackapi/java-slack-sdk/blob/main/bolt/src/main/java/com/slack/api/bolt/middleware/builtin/RequestVerification.java)
{% /table %}

---

## Sample Validation

```js
const crypto = require('crypto')
const timeHeader = 'X-Slack-Request-Timestamp'
const sigHeader = 'X-Slack-Signature'
const hashAlgo = 'sha256'
const encode = 'hex'
const hmacSecret = process.env.WEBHOOK_SECRET
app.post('/slack-webhook', (req, res) => {
    //01: Validate replay prevention with 5 minute timeframe
    const requestTimestamp = req.headers[timeHeader] * 1000;
    const tolerance = Date.now() - (5 * 60 * 1000);
    if (requestTimestamp < tolerance) {
        res.status(403).send('Request expired')
    }else{
        //02: Validate signature
        const message = `v0:${req.headers[timeHeader]}:${JSON.stringify(req.body)}`
        const digest = "v0="+
                       crypto.createHmac(hashAlgo, hmacSecret)
                       .update(message)
                       .digest(encode)
        if (request.headers[sigHeader] !== digest) {
            res.status(401).send('Request unauthorized')
        }else{
            //03: Process message
            res.json({ message: "Success" })
        }
    }
})
```
