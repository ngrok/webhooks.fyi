---
title: Introduction
pageTitle: Webhooks.fyi - Overview
description: In the last 6 months, we integrated webhooks for 100 different systems. This website shows the good, the bad, and the ugly plus our learnings on webhook security.
---

Webhooks are a simple and powerful way for services to notify relevant events. While webhooks are universal, their security implementations vary in complexity, how to use it, and the risks associated. 

Webhooks.fyi documents the different webhook security approaches used by services, alongside best practices for implementing better webhook security as a provider and as a consumer.

## What should you expect to find?

Webhooks.fyi documents the [security approaches](/docs/webhook-security-intro) used by webhook providers, [best security practices](/docs/best-practices-webhook-providers) for both webhook providers and [consumers](/docs/best-practices-webhook-listeners), and a [reference of webhook implementations](/webhook-directory).

## Why does this exists?

Recently, our team studied over 90 and built native integrations for 50 webhook providers. During this effort, we found exciting, confusing, and annoying patterns. That inspired us to write an article and create this documentation so other developers would have a better time building and consuming webhooks.

{% callout title="We have a deep dive" %}
If you want to know more about our experience and our key findinds, read our [Deep Dive: Webhook Security In Practice](https://blog.ngrok.com)
{% /callout %}
