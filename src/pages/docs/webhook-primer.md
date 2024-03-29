---
title: What are webhooks?
description: A quick primer on webhooks and how they work
---

## What are webhooks?

Webhooks are how one system notifies another system of a state change.

In architectural terms, a webhook is a programming language agnostic approach for sending messages between distributed systems. The power of webhooks comes first from being independent of any specific tech stack and second from the notification-based approach. Regardless of your architecture, your systems can receive or broadcast webhooks without being dependent on a specific vendor or even on the same network. Further, downstream systems receiving webhooks don't need to poll a central system for updates or status changes, they can simply listen for an event and process the results.

In practical terms, a webhook is simply an HTTP request - usually a POST or GET - with a JSON payload or parameters broadcast from the central system. Much of the modern web is built on this distributed communication pattern. They're popularly used to notify third-party systems of events such as a new incident tracked by PagerDuty, a successful payment in Stripe, or an SMS received by Twilio.