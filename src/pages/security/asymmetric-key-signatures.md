---
title: Asymmetric Key Signature (EdDSA, ECDSA and RSA)
description: With Asymmetric Key Signatures, webhook providers use a private key to sign requests and listeners use a public key to validate webhook calls
--- 

{% table %}
---
* **Complexity**
* - High
---
* **Pros**
* - Extends HMAC with Non-Repudiation (ensures webhook calls can be sent only by the webhook provider)
---
* **Caveats**
* - Additional deployment complexity (compared to HMAC)
  - Additional operational complexity to issue, renew, and rotate keys
  - Additional performance concerns with signing and validating signatures (compared to HMAC)
---
* **Examples**
* - [SendGrid](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features)
  - [PayPal](https://developer.paypal.com/docs/api-basics/notifications/webhooks/notification-messages/#event-headers)
  - [Keygen](https://keygen.sh/docs/api/signatures/#webhook-signatures)
{% /table %}
---

In our research, we found a few providers — such as PayPal and SendGrid — using asymmetric keys for signing for webhook messages. In this method, the webhook provider uses a private key to sign requests while the listener uses a public key to validate webhook calls. At a conceptual level, the process works as follows:

1. On webhook requests, the provider signs the webhook message using its private key and adds the signature to the webhook request as a header.
2. The webhook listener receives the request and runs an EdDSA, ECDSA or RSA verifier with the public key, the request body, and the signed value from the provider. If the verifier returns positive, it means that the private key could only create the signature, and the request is considered legit.

## Asymmetric key signatures vs HMAC

The major difference between HMAC and asymmetric key signatures is in the verification process. In HMAC, webhook listeners generate the same signature from the provider using the same key to validate the request. With asymmetric signatures, listeners cannot generate the same signature. Instead, they use a verifier with the public key to confirm if the request is legit.

This difference in verification logic delivers non-repudiation. In HMAC, anyone with access to the private key can generate a webhook request. However, with asymmetric keys, only the webhook provider — in possession of the private key — can sign webhook messages.

Webhook implementations with asymmetric keys can also use the same techniques as HMAC providers to add [replay prevention](/security/replay-prevention), [versioning](/ops-experience/versioning), and [key rotation](/ops-experience/key-rotation). SendGrid, for example, implements a timestamp header ( `X-Twilio-Email-Event-Webhook-Timestamp` ) within the payload to mitigate replay attacks.

## Drawbacks

However, webhook signatures with asymmetric keys come with drawbacks. Asymmetric keys are considerably harder to implement than HMAC due to the following:

- **Many different methods for shipping and rotating public keys**: PayPal sends the public key with the webhook request for verification, while SendGrid informs the public key in its settings page. Some other vendors ship asymmetric keys via proprietary APIs and using [JSON Web Keys / JWK](/security/jwt-jwk-oauth2) APIs.
- **Different key formats**: Providers may ship keys in different formats, including PKCS8, PEM, or CER.
- **Library support**: Compared to HMAC, asymmetric key signatures introduce additional complexity with libraries for validation.
- **Performance concerns**: Signing and validating webhook payloads with asymmetric keys is computationally more expensive than using hashing functions (like SHA-256 in HMAC). While performance may not be an issue for most consumers, it is a crucial item for providers that need to keep performance while sending webhook notifications for multiple destinations with different keys.

