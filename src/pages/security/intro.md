---
title: Introduction to Webhook Security
description: Webhooks can be secured during setup, runtime, and with compensatory controls with techniques like one-time verification, authentication, message integrity, IP restrictions, and API callbacks
---

Webhooks can be secured during setup, runtime, and with compensatory controls:

## During Setup

Webhook providers implement security controls during webhook setup to reduce the risk of webhook exploration to obtain confidential data. All webhook services we researched provide authentication and authorization to set up webhooks in their Admin UIs and APIs.
Some webhook providers implement an additional [one time verification challenge](/security/one-time-verification-challenge) to confirm that the webhook consumer controls the endpoint.

## During Runtime

Webhook providers implement security controls on runtime to give consumers ways to validate if notifications are authentic, not tampered with, or replayed.

During our research, we found many different ways that providers provide security during runtime. We broke down each authentication and message security control with some examples, a summary table, and some diagrams:

- [Shared Secrets, Basic Authentication, Bearer Tokens, and Verification tokens](/security/shared-secret)
- [Hash-based Message Authentication Code (HMAC)](/security/hmac)
- [Asymmetric Key Signatures](/security/asymmetric-key-signatures)
- [JWTs, JWKs, and OAuth 2.0](/security/jwt-jwk-oauth2)
- [Mutual TLS Authentication (mTLS)](/security/end-to-end-encryption)
- [Replay Prevention](/security/replay-prevention)

## Compensatory Controls

Webhook listeners can implement compensatory controls — such as IP restrictions and API callbacks to the webhook service — to increase the overall security of webhook communications. We will dive into compensatory controls under [Best practices for webhook consumers](/best-practices/webhook-consumers).
