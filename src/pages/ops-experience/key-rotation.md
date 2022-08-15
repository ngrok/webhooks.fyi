---
title: Key Rotation
description: Webhook security Key Rotation 
--- 

Webhooks rely heavily on secrets — hash keys, tokens, certificates — that should be rotated periodically to keep communications safe. Good webhook implementations recognize this necessity and implement features to simplify and automate the key rotations:

Providers — like [Box](https://developer.box.com/guides/webhooks/v2/signatures-v2/), [Brex](https://developer.brex.com/docs/webhooks/), [Docusign](https://developers.docusign.com/platform/webhooks/connect/hmac/), and [PagerDuty](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures) — implemented interesting controls within their webhooks for key rotation. 

[PagerDuty](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures), for example, can sign webhooks using multiple signatures and then add them all to the `X-PagerDuty-Signature` header (comma separated). This allows you to roll out a new secret key and gradually update your webhook listeners without breaking all listeners at once.

```
X-PagerDuty-Signature:
v1=f03de6f61df6e454f3620c4d6aca17ad072d3f8bbb2760eac3b2ad391b5e8073,
v1=130dcacb53a94d983a37cf2acba98e805a1c37185309ba56fdcccbcf00d6dd8b,
v1=ansdoj213e98jqd928u3eudh239eu2j9d2jd8ejd238eu23ei2d9j23e8u23eue3
```

[Box](https://developer.box.com/guides/webhooks/v2/signatures-v2/) and [Docusign](https://developers.docusign.com/platform/webhooks/connect/hmac/) enumerate signatures as part of the header name:

```
BOX-SIGNATURE-PRIMARY: 6TfeAW3A1PASkgboxxA5yqHNKOwFyMWuEXny/FPD5hI=
BOX-SIGNATURE-SECONDARY: v+1CD1Jdo3muIcbpv5lxxgPglOqMfsNHPV899xWYydo=
```

```
X-DocuSign-Signature-1: DfV+OtRSnsuy.....NLXUyTfY=
X-DocuSign-Signature-2: CL9zR6MI/yUa.....O09tpBhk=
X-DocuSign-Signature-#: CLdaoskdi_kd.....O09tpskk=
```

[Plaid](https://plaid.com/docs/api/webhooks/webhook-verification/) goes one step further and implement the JSON Web Key (JWK) standard for rotating keys. While JWK adds extra complexity during the development, it provides a way for webhook consumers to fetch the latest keys used by Plaid to sign webhook messages. 