---
title: What are webhooks?
description: A quick primer on webhooks%3A what is it and what's the difference between webhooks and APIs
---

## What are webhooks?

Webhooks are a way for a service to send updates to another application as events happen. They're popularly used to notify third-party systems of important events and changes, such as a new incident tracked by PagerDuty, a recurring payment processed in Stripe, or an SMS message sent in Twilio. Much of the modern web is built on this distributed communication pattern.

## What's the difference between webhooks and APIs?

- **APIs** provide a way for applications to use the data and functionality of other systems.The requesting application initiates APIs calls at their own time and convenience. The entire interaction starts and is driven by the application, not the API provider. 

- With **Webhooks**, on the other hand, the service notifies an application when an event happens within the service. Different from the API request, the own service initiates the notification and drives the interaction. As a result, the application receiving a webhook notification must be ready with a listener to receive, validate, and process the event at any time.
