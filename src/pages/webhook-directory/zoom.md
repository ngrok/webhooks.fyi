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
- **[Replay Prevention](/security/replay-prevention)**: ✅

- **Signature Header**: `x-zm-signature`
- **Timestamp Header**: `x-zm-request-timestamp`
- **Timestamp Format**: Unix Date

- **Message signature payload**:
    ```js
    'v0:' + ${request.headers['x-zm-request-timestamp']} + ':' + ${JSON.stringify(request.body)}
    ```

---

## Operational Experience

- **[Rotation](/ops-experience/key-rotation)**: ❌
- **[Versioning](/ops-experience/versioning)**: ✅

