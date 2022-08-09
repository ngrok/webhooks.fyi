---
title: OAuth2, JWTs, and JWKs
description: Webhook security OAuth2, JWTs, and JWKs 
--- 

{% table %}
---
* **Complexity**
* - Very High
---
* **Pros**
* Enables additional security features such as:
  - Message payload formatting with JSON Web Tokens (JWTs)
  - APIs for public key release and rotation with JSON Web Keys (JWKs)
  - Ability to use third party OAuth Authorization servers for webhook authentication
---
* **Caveats**
* - High complexity
  - As of today, we couldn't find a standard approach for using JWTs, JWKs, and OAuth in webhooks
---
* **Examples**
* - [Akamai/Janrain](https://janrain-education-center.knowledgeowl.com/home/json-web-keys)
  - [Brex](https://developer.brex.com/openapi/webhooks_api/#operation/listSecrets)
  - [Plaid](https://plaid.com/docs/api/webhooks/webhook-verification/)
  - [Sendgrid](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features#oauth-20)
  - [Wix](https://devforum.wix.com/kb/en/article/about-webhooks)
  
{% /table %}
---

Webhook providers such as Sendgrid, Wix, and Brex use security methods and protocols typically found in REST APIs — such as OAuth, JSON Web Tokens (JWTs), and JSON Web Keys (JWKs) — in creative ways to protect their webhooks:

* **Sendgrid uses OAuth as a client.** Before sending a webhook message, Sendgrid authorizes itself against third-party OAuth Authorization Servers to issue access tokens. The OAuth tokens must be validated on the listener side to ensure the request is legit and authorized. The validation method is defined by the OAuth Authorization Server, its features, and configuration.
* **Brex uses OAuth to release webhook keys.** Brex uses HMAC with symmetric SHA256 keys for webhook validation. However, in order to obtain the shared key, webhook listeners must make a request to a REST API (GET /v1/webhooks/secrets) protected with OAuth. The call should happen at regular intervals to prevent downtime after a key rotation.
* **Wix uses JWT in the webhook payload**. Wix implements JWT in the webhook payload. Webhook listeners should follow the standard procedure in JWT to validate the webhook payload, using a public certificate provided by Wix in the webhook registration.
* **Janrain (an Akamai product) uses JWKs and JWTs in webhook notifications**. Janrain takes a similar approach to wix and sends a JWT in the webhook payload for validation. However, instead of providing public certificates with the webhook registration, they implement the JSON Web Key (JWK) standard and endpoint to obtain the public keys for webhook validation.
* **Plaid uses JWTs and JWKs in webhook notifications, but not on the message.** Plaid uses JWTs and JWKs like Janrain, but stores the JWT in the plaid-verification header and uses the webhook payload to send information.
