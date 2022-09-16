---
title: GitHub Webhook Specs, Events, and Examples
pageTitle: GitHub Webhooks Specs | Examples| How to integrate
description: Webhook specificactions for GitHub including Supported Events, Example Apps, Security Specs, and Documentations.
--- 

GitHub uses webhooks to notify third-party apps of github events — such as when an issue is created, a branch is created, or when a pull request is approved. Github events can be used to trigger action in other systems such as an external issue tracker, initiate CI builds, update a backup mirror, or even deploy to your production servers.

{% table %}
---
* ## Specifications
* - **[HMAC Authentication](/security/hmac)**
  - **[Replay Prevention](/security/replay-prevention)**: ❌
  - **[Forward Compatibility](/ops-experience/versioning)**: ❌
  - **[Zero Downtime Rotation](/ops-experience/key-rotation)**: ❌
  - **[One Time Verification Challenge](/security/one-time-verification-challenge)**: ✅
---
* ## Supported Events
* - **[Official Doc ↗](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)**
---
* ## Security Headers
* - **Signature Header**: `X-Hub-Signature-256`
  - **Hash**: sha256
  - **Encode**: hex
  - **payload**: `request_body`
---
* ## Documentation
* - [Official Doc ↗](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
  - [Verification Challenge ↗](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks#ping-event)
---
* ## SDKs and Sample Code
* - [Python ↗](https://github.com/github/platform-samples/tree/master/hooks/python)
  - [Ruby ↗](https://github.com/github/platform-samples/tree/master/hooks/ruby)
  - [Jenkins ↗](https://github.com/github/platform-samples/tree/master/hooks/jenkins)
{% /table %}
---

## Sample Validation

```js
const crypto = require('crypto')
const sigHeader = 'X-Hub-Signature-256'
const hashAlgo = 'sha256'
const encode = 'hex'
const hmacSecret = process.env.WEBHOOK_SECRET
app.post('/github-webhook', (req, res) => {
  //01: Validate signature
  const message = req.body
  const digest = 'sha256='+
                  crypto.createHmac(hashAlgo, hmacSecret)
                  .update(message).digest(encode)
  if (request.headers[sigHeader] !== digest) {
      res.status(401).send('Request unauthorized')
  }else{
      //02: Process message
      res.json({ message: "Success" })
  }
})
```
