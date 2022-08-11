---
title: One time verification challenge
description: One time verification challenge
--- 

{% table %}
---
* **Complexity**
* - Medium
---
* **Pros**
* - Validates if the webhook consumer controls a destination before sending webhook notifications
  - Can be easily combined with other webhook authentication controls
---
* **Caveats**
* - Additional implementation complexity
---
* **Examples**
* - [Adobe Sign](https://helpx.adobe.com/sign/using/adobe-sign-webhooks-api.html#VoI)
  - [Microsoft OneDrive](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/webhook-receiver-validation-request?view=odsp-graph-online)
  - [Okta](https://developer.okta.com/docs/concepts/event-hooks/#one-time-verification-request)
  - [Twitter](https://developer.twitter.com/en/docs/twitter-api/enterprise/account-activity-api/guides/securing-webhooks)
{% /table %}
---

While all providers implement authentication and authorization to set up webhooks, that doesn't confirm if the webhook consumer controls the code receiving webhook notifications.

To mitigate this risk, webhook providers like [Twitter](https://developer.twitter.com/en/docs/twitter-api/enterprise/account-activity-api/guides/securing-webhooks), [Okta](https://developer.okta.com/docs/concepts/event-hooks/#one-time-verification-request), and [Microsoft OneDrive](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/webhook-receiver-validation-request?view=odsp-graph-online) implement a verification/challenge request.

The challenge request is sent during setup, and contains a random string that should be relayed back as part of the response:

```curl
GET https://listener.com/my-webhook?validationToken=randomString
Content-Length: 0

HTTP/1.1 200 OK
Content-Type: text/plain

randomString
```

Webhook notifications are not sent until the challenge response is successful.