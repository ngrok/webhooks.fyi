---
title: Introduction to Webhook Security
description: An introduction to webhook security on setup, during runtime, and compensatory controls
---

Webhooks can be secured during setup, runtime, and with compensatory controls: 

## Webhook Security: Setup

Webhook providers implement security controls during webhook setup to reduce the risk of webhook exploration to obtain confidential data. All webhook services we researched provide some form of authentication and authorization to access the webhook setup pages and APIs. 

Webhook providers like [Twitter](https://developer.twitter.com/en/docs/twitter-api/enterprise/account-activity-api/guides/securing-webhooks), [Okta](https://developer.okta.com/docs/concepts/event-hooks/#one-time-verification-request), and [Microsoft OneDrive](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/webhook-receiver-validation-request?view=odsp-graph-online) take an extra step, requiring a webhook listener verification during setup to ensure you own and control the app that will receive webhook calls.

These providers trigger the verification process with a special request containing a random string that should be relayed back as part of the response:

```curl
GET https://listener.com/my-webhook?validationToken=randomString
Content-Length: 0

HTTP/1.1 200 OK
Content-Type: text/plain

randomString
```

## Webhook Security: Runtime

Webhook providers implement security controls on runtime to give listeners ways to validate if notifications are legit, not tampered with, or replayed.

In our research, 97% of the webhook providers implement security controls on runtime. However, at the time of our study, we couldn't find any documentation on [Jira](https://developer.atlassian.com/server/jira/platform/webhooks/#overview), [Olark](https://www.olark.com/help/webhooks), and [ActiveCampaign](https://www.activecampaign.com/blog/working-with-webhook-data) webhook security controls on runtime.

Security during runtime is the most astounding area of this article in both volume and findings. In the next pages, we break down each authentication and message security control with some examples, a summary table, and some diagrams:

- [Shared Secrets, Basic Authentication, Bearer Tokens, and Verification token](/security/shared-secret)
- [Hash-based Message Authentication Code (HMAC)](/security/hmac)
- [Asymmetric Key Encryption](/security/asymmetric-key-encryption)
- [JWTs, JWKs, and OAuth 2.0](/security/jwt-jwk-oauth2)
- [Mutual TLS Authentication (mTLS)](/security/end-to-end-encryption)

## Webhook Security: Compensatory Controls

Webhook listeners can implement compensatory controls — such as IP restrictions and API callbacks to the webhook service — to increase the overall security of webhook communications. We will dive into compensatory controls under [Best practices for webhook consumers]().
