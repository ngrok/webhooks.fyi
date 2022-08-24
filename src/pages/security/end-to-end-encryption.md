---
title: Mutual TLS Authentication (mTLS)
description: The use of mTLS authentication ensures both webhook service and listener are authenticated — through a TLS handshake — before a webhook message is sent 
--- 

{% table %}
---
* **Complexity**
* - Very High
---
* **Pros**
* - Message Confidentiality
  - Non-Repudiation (ensures webhook calls can be sent only by the webhook provider)
---
* **Caveats**
* - High complexity
  - Operational complexity on key rotation
---
* **Examples**
* - [Adobe Sign](https://helpx.adobe.com/sign/using/adobe-sign-webhooks-api.html#SSL)
  - [DocuSign](https://developers.docusign.com/platform/webhooks/mutual-tls)
  - [PagerDuty](https://developer.pagerduty.com/docs/1fb4905778afc-mutual-tls)
{% /table %}
---

The use of Mutual TLS (mTLS) authentication ensures that traffic is secure and trusted in both directions between webhook services and listeners. With mTLS, both webhook service and listener pass through a TLS handshake — in which both systems present trusted certificates — before the webhook notification is sent. 

This method delivers a stronger authentication between the webhook service and listener and ensures communication confidentiality — a webhook message is sent only after both sides are authenticated. When combined with webhook signatures, it also delivers message integrity.

{% diagram-mtls / %} 

_Mutual TLS with request signature validation_

## Security at the transport layer

Mutual TLS (mTLS) is an encryption protocol defined at the transport layer and available for TCP communications regardless of their application protocol:
- Webhooks leverage mTLS the same way protocols like HTTPS, SQL, and SSH.
- mTLS can be used with other webhooks security controls, such as [HMAC](/security/hmac). However, in most cases, mTLS provides enough security to mitigate the use of additional webhook controls.

## Drawbacks

However, mTLS is often difficult to configure. It also requires updates whenever TLS certificates are issued, renewed, or revoked both on the webhook service and the listener side. This additional burden is considered overkill for most use-cases.