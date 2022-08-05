---
title: A quick primer on webhooks
description: A quick primer on webhooks
---


---


## What are webhooks?

Webhooks are a way for a service to send data to another application as events happen. They're popularly used to programmatically notify third-party systems of important events and changes, such as a new incident opened in PagerDuty, a payment processed in Stripe, or an SMS message sent in Twilio.

## What's the difference between webhooks and APIs?

APIs provide a way for requester systems to pull information and send commands to a service. The requester initiates APIs calls at their own time and convenience. Most of the time, API requests are processed synchronously (the requester waits on the line until the service processes and retrieves a response).
With Webhooks, on the other hand, the service notifies a third-party app when a significant event happens within the service. Different from the API request, the own service initiates the notification. As a result, the application receiving a webhook notification must be ready with a listener to receive, validate, and process the event at any time.
