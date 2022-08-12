---
title: Key Rotation
description: Webhook security Key Rotation 
--- 

Webhooks rely heavily on secrets — hash keys, tokens, certificates — that should be rotated periodically to keep communications safe. Good webhook implementations recognize this necessity and implement features to simplify and automate the key rotations:

Providers — like [Box](https://developer.box.com/guides/webhooks/v2/signatures-v2/), [Brex](https://developer.brex.com/docs/webhooks/), [Docusign](https://developers.docusign.com/platform/webhooks/connect/hmac/), and [PagerDuty](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures) — implemented interesting controls within their webhooks for key rotation. 

[PagerDuty](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures), for example, can sign webhooks using multiple signatures and then add them all to the `X-PagerDuty-Signature` header (comma separated). This allows you to roll out a new secret key and gradually update your webhook listeners without breaking all listeners at once.

[Plaid](https://plaid.com/docs/api/webhooks/webhook-verification/) goes one step further and implement the JSON Web Key (JWK) standard for rotating keys. While JWK adds extra complexity during the development, it provides a way for webhook consumers to fetch the latest keys used by Plaid to sign webhook messages. 