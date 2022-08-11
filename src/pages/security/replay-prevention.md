---
title: Replay prevention
description: Webhook security Replay prevention 
--- 

{% table %}
---
* **Complexity**
* - Medium
---
* **Pros**
* - Mitigates replay attacks by adding a signed timestamp to the webhook request
---
* **Caveats**
* - Requires webhook provider and consumers to have clock in sync (or close to)
  - Requires alignment in time format — i.e. UNIX timestamp or RFC 3339 and time zones for the proper validation
  - Timestamps can be sent in the same header as hash signatures or in a dedicated timestamp header
---
* **Examples**
* - [8x8](https://developer.8x8.com/contactcenter/docs/verify-webhook-callbacks)
  - [Calendly](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM4-webhook-signatures)
  - [Slack](https://api.slack.com/authentication/verifying-requests-from-slack)
  - [PayPal](https://developer.paypal.com/api/rest/webhooks/#link-eventheadervalidation)
  - [Zendesk](https://developer.zendesk.com/documentation/event-connectors/webhooks/verifying/)
{% /table %}
---

Many webhook vendors take advantage of hashing and encryption to add security beyond authentication and message integrity. By combining message integrity with timestamps, providers offer a way to validate when a call is made and mitigate replay attacks. In our research, We saw the use of timestamps in conjunction with HMAC — i.e. [Calendly](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM4-webhook-signatures), Assymetric Encryption - [PayPal](https://developer.paypal.com/api/rest/webhooks/#link-eventheadervalidation), and JWT/JWK/OAuth — [8x8](https://developer.8x8.com/contactcenter/docs/verify-webhook-callbacks). Timestamp generation and validation takes the following steps:

On webhook requests, the provider:

1. Concatenates the timestamp of when the request is created with the webhook payload
1. Signs the concatenated value
1. Sends both the encoded signature and the timestamp to the webhook request

The webhook listener receives the request and:

1. Extracts the timestamp — i.e. from the request header — and validates if the timestamp is within an acceptable timeframe (i.e., 3-5 minutes).
1. If the timestamp is valid, repeat the same steps from the webhook provider to sign the timestamp+request body and compare the results with the signature sent. If the result matches, the request is considered legit. If not, the request is not authenticated and its contents or timestamp are tampered.

To ensure the timestamp validation works, you must keep your listener clock in sync with the webhook provider. The use of an NTP server should address this concern.