---
title: Introduction
pageTitle: Webhooks.fyi - Overview
description: In the last 6 months, we integrated webhooks for 100 different systems. This website shows the good, the bad, and the ugly plus our learnings on webhook security.
---

Webhooks are a simple and powerful way for services to notify other systems of relevant events. While webhooks are universal in concept, their security implementations vary in complexity and effectiveness.

Webhooks.fyi is a survey of numerous webhook security approaches, explanations of each, and a set of recommendations for implementing better webhook security both as a provider and as a consumer.

## What should you expect to find?

Webhooks.fyi documents the [security approaches](/docs/webhook-security-intro) used by webhook providers, [best security practices](/docs/best-practices-webhook-providers) for both webhook providers and [consumers](/docs/best-practices-webhook-listeners), and a [reference of webhook implementations](/webhook-directory).

## Why does this exists?

Recently, [our team at ngrok](https://ngrok.com/) studied over 90 webhook providers and built in-product verifications for 50 of the most popular providers. During this effort, we found exciting, confusing, and annoying patterns that inspired us to share our research so other developers can build and consume webhooks more securely.

{% callout title="We have a deep dive" %}
If you want to know more about our research and our key findings, read our [Deep Dive: Webhook Security In Practice](https://blog.ngrok.com)
{% /callout %}

[comment]: <TODO: @caseysoftware: update for the actual link to the blog post?>
