---
title: What are webhooks?
description: A quick primer on webhooks%3A what is it and what's the difference between webhooks and APIs
---

## What are webhooks?

Webhooks are a way for a service to send updates to another application as events happen. They're popularly used to notify third-party systems of important events and changes, such as a new incident tracked by PagerDuty, a recurring payment processed in Stripe, or an SMS message sent in Twilio. Much of the modern web is built on this distributed communication pattern.

Different from traditional API requests — originated by the API client when it needs information — webhooks are triggered by events originated on the service provider — i.e. document signed in Docusign, payment processed in Stripe, meeting recording available on Zoom. As a result, applications receiving webhook notifications must be up to receive, validate security, and process the event at any time.
