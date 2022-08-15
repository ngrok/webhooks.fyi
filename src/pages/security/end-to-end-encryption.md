---
title: Mutual TLS Authentication (mTLS)
description: Webhook security mTLS 
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

The use of mTLS authentication ensures that traffic is secure and trusted in both directions between webhook services and listener apps. With mTLS, both webhook service and listener apps pass through a TLS handshake — in which each system is required to authenticate with their certificates — before the webhook message is sent. 

This method delivers a stronger authentication between the webhook service and listener, ensures communication confidentiality (the webhook message is sent only after both sides are authenticated), and both integrity and non-repudiation (when combined with webhook signatures).

{% diagram-mtls / %} 

_Mutual TLS with request signature validation_

## Security at the transport layer

Mutual TLS (mTLS) is an encryption protocol defined at the transport layer and available for TCP communications regarless of their application protocol:
- Webhooks leverage mTLS the same way protocols like HTTPS, SQL, and SSH.
- mTLS can be used together with other webhooks security controls, such as [HMAC](/security/hmac). However, mTLS provides enough security to mitigate the use of additional webhook controls in most cases.

## Drawbacks

However, mTLS is often difficult to configure. It also requires updates whenever TLS certificates are issued, renewed, or revoked both on the webhook service and the listener side. This additional burden is considered overkill for most use-cases.
