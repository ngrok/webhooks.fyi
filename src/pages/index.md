---
title: Introduction
pageTitle: Webhooks.fyi - Overview
description: In the last 6 months, we integrated webhooks for 100 different systems. This website shows the good, the bad, and the ugly plus our learnings on webhook security.
---

Webhooks are a simple and powerful way for services to notify other systems of relevant events. While webhooks are universal in concept, they are unstandardized API contracts, with implementations varying in security controls and operational experience.

Webhooks.fyi is explores the most popular approaches for securing and operating webhooks, with recommendations building better webhooks as a provider and for using webhooks as a consumer.

## What should you expect to find?

This website is split in four sections:

- [Webhook Directory](/docs/webhook-directory) lists different webhook implementations with their security and operational experience features
- [Webhook Security](/security/intro) documents the approaches for securing webhook communications
- [Operational Experience](/ops-experience/intro) describes features for delivering a better experience for consuming and maintaining webhooks
- Best Practices for webhook [providers](/best-practices/webhook-providers) and [consumers](/best-practices/webhook-consumers)

## Why does this exists?

Recently, [our team at ngrok](https://ngrok.com/) studied 100 webhook providers and built in-product verifications for 50 of the most popular providers. During this effort, we found exciting and challenging patterns that inspired us to share our research so other developers can build and consume webhooks more securely.

{% callout title="We have a deep dive" %}
If you want to know more about our research and our key findings, read our [Deep Dive: Webhook Security In Practice](https://blog.ngrok.com)
{% /callout %}

[comment]: <TODO: @caseysoftware: update for the actual link to the blog post>
