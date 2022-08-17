---
title: Heartbeat, Queueing, and Circuit Breaking
description: Webhook listeners — like any other piece of software — will eventually become unstable or unavailable due to network or system issues. Good webhook providers recognize availability as an inevitable problem and provide resiliency features to reduce the burden on webhook consumers. 
--- 


[comment]: <TODO: @sudobinbash: Future: Break sections into categories>

Webhook listeners — like any other piece of software — will eventually become unstable or unavailable due to network or system issues. Some webhook providers — such as [Bolt](https://help.bolt.com/developers/guides/webhooks/webhook-failure-notifications/), [Aftership](https://www.aftership.com/docs/aftership/webhook/webhook-overview#retry-webhooks), [BitBucket](https://confluence.atlassian.com/bitbucketserver/manage-webhooks-938025878.html#Managewebhooks-Circuitbreaking), and [Square](https://developer.squareup.com/docs/webhooks/overview#notification-retries) — recognize **availability as an inevitable problem** and provide resiliency features to reduce the burden on webhook consumers. Examples of interesting features include:

- **Heartbeat checks**: Webhook providers regularly reach out to webhook listeners to check their status. If a listener is unavailable, the provider takes action — such as queueing notifications or sending alerts to system admins — until the webhook listener gets fixed. This feature is helpful, especially in webhooks that don't send messages often.

    ```js
    app.post('/webhook', (req, res) => {
      if (!req.rawBody) {
        // empty value = heartbeat check. Return 200 or 204 - No Content
        res.status(204).send()
      }else{
        ...
    ```

- **Queueing**: webhook providers can keep track of historical information of webhook events sent and allow consumers to send messages again after failures or unavailability. Queues can be implemented on listener errors or in conjunction with heartbeat checks.

    ![Webhook Events and retry mechanism](/img/webhook_failure.png)

- **Circuit Breaking**: Some webhook providers implement circuit breaking logic to throttle and alleviate requests to webhook listeners when webhook requests cross an error or response time threshold.

    ![Webhook Circuit breaking](/img/circuit_breaking.png)

These features help consumers keep their service resilient and recover from issues faster and without message loss. 
