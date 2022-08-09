---
title: Key Rotation
description: Webhook security Key Rotation 
--- 

HMAC keys are no different than other encryption keys and should be rotated periodically for better security. Some webhook providers — like [Box](https://developer.box.com/guides/webhooks/v2/signatures-v2/), [Brex](https://developer.brex.com/docs/webhooks/), [Docusign](https://developers.docusign.com/platform/webhooks/connect/hmac/), and [PagerDuty](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures) — implemented interesting controls within their webhooks for key rotation. PagerDuty, for example, can sign webhooks using multiple signatures and then add them all to the X-PagerDuty-Signature header (comma separated). This allows you to roll out a new secret key and gradually update your webhook listeners without breaking all listeners at once.