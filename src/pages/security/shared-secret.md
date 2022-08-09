---
title: Shared Secret
description: Basic Authentication, Shared Credentials, or Verification Token
--- 

## Features

{% spec-table %}
  {% spec-table-row title="Complexity" description="Very Low" /%}
  {% spec-table-row title="Authentication" description="✅" /%}
  {% spec-table-row title="Confidentiality" description="❌" / %}
  {% spec-table-row title="Integrity" description="❌" / %}
  {% spec-table-row title="Non-Repudiation" description="❌" / %}
  {% spec-table-row title="Replay Prevention" description="❌" / %}
  {% spec-table-row title="Versioning" description="❌" / %}
  {% spec-table-row title="Zero Downtime Rotation" description="❌" / %}
{% /spec-table %}

## Overview

In our research, 10% of the webhook providers use Shared Secrets — in form of Basic Authentication, shared credentials, bearer tokens, or a verification token — for authentication. In this method, the webhook provider and listener share a common secret used exclusively to authenticate webhook requests:

1. On webhook requests, the provider sends a webhook notification containing the message plus a shared secret in a pre-defined header variable or the Authorization header using the Basic Auth format ( `Authorization: Basic &lt;"username:password" in base64>` ).
2. The webhook listener validates the value in the request versus the shared secret. Only requests with the correct secret are processed.

```mermaid
sequenceDiagram
   Note left of Webhook Service: Create webhook message
   Note left of Webhook Service: Add Shared Secret
   Webhook Service->>+Listening App: Send Webhook notification
   Note right of Listening App: Validate Shared Secret
   Note right of Listening App: Process webhook call
   Listening App-->>-Webhook Service: Return response
```

_Basic Authentication, or shared credentials, or verification token on webhook requests_

This security method addresses only the webhook service authentication and does not implement any control on message integrity. Even with HTTPS, the shared secret is processed in clear text, increasing the risk of the secret getting compromised.

Therefore, their use should be avoided in production or used only with compensatory controls — such as IP Restrictions and callback requests — to mitigate risks.

{% callout title="Note" %}
   Some services offer basic auth as a quick option meant for development and unit testing, alongside more robust security controls for production usage. [DocuSign](https://developers.docusign.com/platform/webhooks/connect/validation-and-security/), for example, offers basic authentication, Request Signatures with HMAC, and Mutual TLS, and encourages the use of HMAC and mTLS in production use-cases.
{% /callout %}


## Examples

{% spec-table %}
  {% spec-table-row title="Big Commerce" description="Docs" link="https://developer.bigcommerce.com/api-docs/store-management/webhooks/overview#security" /%}
  {% spec-table-row title="Crowdstrike Orchestrator" description="Docs" link="https://www.crowdstrike.com/resources/videos/falcon-orchestrator-demo-with-evan-burns/" /%}
  {% spec-table-row title="GitLab" description="Docs" link="https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#validate-payloads-by-using-a-secret-token" /%}
  {% spec-table-row title="Zoom" description="Docs" link="https://marketplace.zoom.us/docs/guides/build/webhook-only-app" /%}
  {% spec-table-row title="Datadog" description="Docs" link="https://docs.datadoghq.com/integrations/webhooks/#authentication" /%}
  {% spec-table-row title="VMWare WorkspaceOne" description="Docs" link="https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/System_Settings_On_Prem/GUID-AWT-SYSTEM-ADVANCED-API-NOTIF.html" /%}
  {% spec-table-row title="mParticle" description="Docs" link="https://docs.mparticle.com/integrations/webhook/event/" /%}
  {% spec-table-row title="Okta Event Hooks" description="Docs" link="https://developer.okta.com/docs/concepts/event-hooks/#one-time-verification-request" /%}
  {% spec-table-row title="DocuSign" description="Docs" link="https://developers.docusign.com/platform/webhooks/connect/validation-and-security/" /%}
{% /spec-table %}

