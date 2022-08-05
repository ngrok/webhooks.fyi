---
title: OAuth2, JWTs, and JWKs
description: Webhook security OAuth2, JWTs, and JWKs 
--- 

## Features

{% spec-table %}
  {% spec-table-row title="Complexity" description="Very High" /%}
  {% spec-table-row title="Authentication" description="✅" /%}
  {% spec-table-row title="Confidentiality" description="❌" / %}
  {% spec-table-row title="Integrity" description="✅" / %}
  {% spec-table-row title="Non-Repudiation" description="❌" / %}
  {% spec-table-row title="Replay Prevention" description="Requires Timestamps" link="/docs/hmac/replay-prevention" / %}
  {% spec-table-row title="Versioning" description="Requires Forward Compatibility" link="/docs/hmac/versioning" / %}
  {% spec-table-row title="Zero Downtime Rotation" description="Requires Key Rotation" link="/docs/hmac/key-rotation" / %}
{% /spec-table %}

## Overview

Webhook providers such as Sendgrid, Wix, and Brex use security methods and protocols typically found in REST APIs — such as OAuth, JSON Web Tokens (JWTs), and JSON Web Keys (JWKs) — in creative ways to protect their webhooks:

* **Sendgrid uses OAuth as a client.** Before sending a webhook message, Sendgrid authorizes itself against third-party OAuth Authorization Servers to issue access tokens. The OAuth tokens must be validated on the listener side to ensure the request is legit and authorized. The validation method is defined by the OAuth Authorization Server, its features, and configuration.
* **Brex uses OAuth to release webhook keys.** Brex uses HMAC with symmetric SHA256 keys for webhook validation. However, in order to obtain the shared key, webhook listeners must make a request to a REST API (GET /v1/webhooks/secrets) protected with OAuth. The call should happen at regular intervals to prevent downtime after a key rotation.
* **Wix uses JWT in the webhook payload**. Wix implements JWT in the webhook payload. Webhook listeners should follow the standard procedure in JWT to validate the webhook payload, using a public certificate provided by Wix in the webhook registration.
* **Janrain (an Akamai product) uses JWKs and JWTs in webhook notifications**. Janrain takes a similar approach to wix and sends a JWT in the webhook payload for validation. However, instead of providing public certificates with the webhook registration, they implement the JSON Web Key (JWK) standard and endpoint to obtain the public keys for webhook validation.
* **Plaid uses JWTs and JWKs in webhook notifications, but not on the message.** Plaid uses JWTs and JWKs like Janrain, but stores the JWT in the plaid-verification header and uses the webhook payload to send information.

## Examples

{% spec-table %}
  {% spec-table-row title="Sendgrid" description="Docs" link="https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features#oauth-20" /%}
  {% spec-table-row title="Wix" description="Docs" link="https://devforum.wix.com/kb/en/article/about-webhooks" /%}
  {% spec-table-row title="Brex" description="Docs" link="https://developer.brex.com/openapi/webhooks_api/#operation/listSecrets" /%}
  {% spec-table-row title="Akamai / Janrain" description="Docs" link="https://janrain-education-center.knowledgeowl.com/home/json-web-keys" /%}
  {% spec-table-row title="Plaid" description="Docs" link="https://plaid.com/docs/api/webhooks/webhook-verification/" /%}
{% /spec-table %}