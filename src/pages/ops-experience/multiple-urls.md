---
title: Multiple URLs
description: Great webhook implementations allow users to send notifications to multiple URLs with different levels of security and events notified
--- 

[comment]: <TODO: @sudobinbash: add more good examples>

Often, webhook consumers must send webhook notifications to multiple systems. For example, many companies set up PagerDuty to send webhook notifications to multiple systems when incidents are triggered, including Slack — to send an alert to operations, Jira Service Desk — to track the event, and Okta Workflows — to grant temporary access to production servers so the engineer on duty can solve the issue. 

Good webhook solutions allow users to send events to multiple listeners/URLs while keeping independent authentication secrets for each system. [DocuSign](https://developers.docusign.com/platform/webhooks/connect/hmac/), for example, lets you set independent URLs with up to 20 different signing keys to support this use case.