---
title: Multiple URLs
description: Multiple URLs
--- 

[comment]: <TODO: @sudobinbash: add more good examples>

Often times, webhook consumers will need to send webhook notifications to multiple systems. As an example, in my previous work, I set up PagerDuty to send notifications to two different systems when an incident was logged: Slack — to send an urgent alert to my SRE team — and Okta Workflows — to grant privileged access to a production server only to an engineer on duty to troubleshoot and solve the issue. 

Good webhoook solutions allow users to send events to multiple listeners/URLs while keeping independent authentication secrets for each system. [Docusign](https://developers.docusign.com/platform/webhooks/connect/hmac/), for example, lets you set independent urls with up to 20 different signing keys to support this use-case.