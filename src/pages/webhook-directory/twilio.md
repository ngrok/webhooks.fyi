---
title: Twilio Webhook Specs, Events, and Examples
pageTitle: Twilio Webhooks Specs | Examples| How to integrate
description: Webhook specificactions for Twilio including Supported Events, Example Apps, Security Specs, and Documentations.
--- 

Twilio uses webhooks to notify third-party apps of events in its main products including voice calls initiated, SMS messages sent, and dialogs started in autopilot. You can wire Twilio events to trigger action in third-party apps such as record when someone responds to an SMS message.

{% table %}
---
* ## Specifications
* - **[HMAC Authentication](/security/hmac)**
  - **[Replay Prevention](/security/replay-prevention)**: ❌
  - **[Forward Compatibility](/ops-experience/versioning)**: ❌
  - **[Zero Downtime Rotation](/ops-experience/key-rotation)**: ❌
---
* ## Supported Events
* - Twilio providers different events for each product — Voice, SMS, Conversations, Sync, Authy, Chat, and Autopilot. The full list of events for each product is available in its **[Official Doc ↗](https://www.twilio.com/docs/usage/webhooks#webhooks-by-product)**
---
* ## Security Headers
* - **Signature Header**: `X-Twilio-Signature`
  - **Hash**: sha1
  - **Encode**: base64
  - **payload**: `hash`
---
* ## Documentation
* - [Official Doc ↗](https://www.twilio.com/docs/usage/security#validating-requests)
---
* ## SDKs and Sample Code
* - [Voice Webhook: Example ↗](https://www.twilio.com/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/node)
  - [SMS Webhook: Example ↗](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js)
  - [Authy Webhook: Example ↗](https://github.com/AuthySE/webhooks-api)
{% /table %}

---

## Sample Validation

```js
const crypto = require('crypto')
const sigHeader = 'X-Twilio-Signature'
const hashAlgo = 'sha1'
const encode = 'base64'
const hmacSecret = process.env.WEBHOOK_SECRET
app.post('/twilio-webhook', (req, res) => {
  //01: Validate signature
  const message = req.body
  const digest = crypto.createHmac(hashAlgo, hmacSecret)
                 .update(message).digest(encode)
  if (request.headers[sigHeader] !== digest) {
      res.status(401).send('Request unauthorized')
  }else{
      //02: Process message
      res.json({ message: "Success" })
  }
})
