---
title: Mutual TLS Authentication (mTLS)
description: Webhook security mTLS 
--- 

## Features

{% spec-table %}
  {% spec-table-row title="Complexity" description="Very High" /%}
  {% spec-table-row title="Authentication" description="✅" /%}
  {% spec-table-row title="Confidentiality" description="✅" / %}
  {% spec-table-row title="Integrity" description="✅" / %}
  {% spec-table-row title="Non-Repudiation" description="✅" / %}
  {% spec-table-row title="Replay Prevention" description="❌" / %}
  {% spec-table-row title="Versioning" description="❌" / %}
  {% spec-table-row title="Zero Downtime Rotation" description="❌" / %}
{% /spec-table %}

## Overview

The use of mTLS authentication ensures that traffic is secure and trusted in both directions between webhook services and listener apps. With mTLS, both webhook service and listener apps pass through a TLS handshake — in which each system is required to authenticate with their certificates — before the webhook message is sent. This method delivers a stronger authentication between the webhook service and listener, ensures communication confidentiality (the webhook message is sent only after both sides are authenticated), and both integrity and non-repudiation (when combined with webhook signatures).

```mermaid
sequenceDiagram
  Webhook Service->Listening App: Initiate mTLS handshake
  Note over Webhook Service,Listening App: Both Webhook Service and Listening App go through the Mutual TLS authentication
  Note left of Webhook Service: Create webhook message
  Note left of Webhook Service: Generate signature hash of the message body with the shared secret
  Webhook Service->>+Listening App: Send Webhook notification
  Note right of Listening App: Generate signature hash of the message body with the shared secret
  Note right of Listening App: Validate signature hash vs the value sent by the webhook service
  Note right of Listening App: Process webhook call
  Listening App-->>-Webhook Service: Return response.
```

_Mutual TLS with request signature validation _

However, mTLS is often difficult to configure. It also requires updates whenever TLS certificates are issued, renewed, or revoked both on the webhook service and the listener side. This additional burden is considered overkill for most use-cases.

## Examples

{% spec-table %}
  {% spec-table-row title="DocuSign" description="Docs" link="https://developers.docusign.com/platform/webhooks/mutual-tls" /%}
  {% spec-table-row title="PagerDuty" description="Docs" link="https://developer.pagerduty.com/docs/1fb4905778afc-mutual-tls" /%}
  {% spec-table-row title="Adobe Sign" description="Docs" link="https://helpx.adobe.com/sign/using/adobe-sign-webhooks-api.html#SSL" /%}
{% /spec-table %}

