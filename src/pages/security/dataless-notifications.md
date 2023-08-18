---
title: Dataless notifications
description: Learn how webhook providers like Microsoft OneNote send webhooks notifications without passing confidential data and the trade-offs with this approach.
--- 

{% table %}
---
* **Complexity**
* - High
---
* **Pros**
* - Send webhook notifications without confidential data
  - Help reduce webhook security requirements
  - Can reduce request traffic with bulk operations
---
* **Caveats**
* - Webhook consumers must reach provider to gather information
  - Webhook consumers must have API keys to call the provider
  - API Performance and API Limits
---
* **Example**
* - [Microsoft OneNote](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/using-webhooks)
* - [Smartsheet](https://smartsheet.redoc.ly/tag/webhooksDescription#section/Intro-to-Webhooks)
{% /table %}
---

Microsoft OneNote uses webhooks only to signal that an event has happened. The webhook payload carries only minimal data — event id, expiration date, resource, and state — without confidential details, reducing the risk of data breaches:

```
{
  "value": [
    {
      "subscriptionId": "A640DFF3-0429-44FC-AF7E-30523A476864",
      "expirationDateTime": "2017-02-22T16:00:00Z",
      "resource": "/me/drive/root",
      "clientState": "client-specific string"
    }
  ]
}
```

Upon receiving a webhook notification, consuming apps make a request to the provider to gather more details about the event.

While this technique helps reduce webhook security requirements, it requires webhook consumers to make proprietary API calls to the webhook provider to gather details.
This adds implementation complexity for the webhook consumer and operational complexity with distributing API keys, handling REST API performance, and rate limits.