---
title: Introduction
pageTitle: Webhooks.fyi
description: Learn the most popular approaches for building, securing, and operating webhooks, with recommendations for webhook providers and consumers
---

Webhooks are the foundation of modern API development. They enable us to react to changes in our systems, an incoming text message, a successful payment, or that latest pull request no matter our stack. While webhooks are universal in concept, they are unstandardized API contracts with few organizations paying attention to their design, security controls, and overall operational experience.

Webhooks.fyi seeks to change that.

It serves both as a directory of webhook providers and a collection of best practices for providing and consuming webhooks. Starting from security, moving into payload protection, and continuing into operationalizing webhooks, we delve into the concepts and practices currently available in the wild. 

## What should you expect to find?

- [Webhook Directory](/docs/webhook-directory) lists different webhook implementations with their security and operational experience features
- [Webhook Security](/security/intro) documents the approaches for securing webhook communications
- [Operational Experience](/ops-experience/intro) describes features for delivering a better experience for consuming and maintaining webhooks
- [Best Practices for webhook providers](/best-practices/webhook-providers) and [consumers](/best-practices/webhook-consumers)

## Contributing to webhooks.fyi

Yes! We have many webhooks to document, patterns to uncover, and best practices to highlight!
Our [contributing page](/docs/how-to-contribute) covers how you can help.

## Why does webhooks.fyi exists?

Recently, [our team at ngrok](https://ngrok.com/) studied 100 webhook providers and built in-product verifications for 50 of the most popular providers. During this effort, we found exciting and challenging patterns that inspired us to share our research so other developers can build and consume webhooks more securely.

[comment]: <TODO: @sudobinbash: Launch blog>
[comment]: <{% callout title="We have a deep dive" %}>
[comment]: <If you want to know more about our research and our key findings, read our [Deep Dive: Webhook Security In Practice](https://blog.ngrok.com/posts/get-webhooks-secure-it-depends-a-field-guide-to-we)>
[comment]: <{% /callout %}>
