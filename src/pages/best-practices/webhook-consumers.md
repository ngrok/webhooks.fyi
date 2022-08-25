---
title: Best Practices for Webhook Consumers
description: Security Best Practices for Webhook Consumers
---

In addition to using a good webhook provider and implementation, you can take the following steps to improve your webhook security:

* **Use HTTPS on the listener with a strong cipher suite**: First and foremost, do not operate in clear text (seriously, don't!). Most webhooks don't provide any control to encrypt your messages. This recommendation is even more critical in webhooks with  Basic Authentication and shared secrets. Use HTTPS with a strong cipher suite to mitigate the man-in-the-middle.

* **Review the webhook documentation and ensure you're implementing all the security features offered:** in webhook communications, the authentication, message integrity validation, and replay prevention validation, and enforcement happen on the webhook listener. Therefore, you should read, understand, and implement the security controls made available by your provider.

* **Restrict who can send you webhook requests based on the IP**: Some services — i.e. [GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-githubs-ip-addresses) and [Zoom](https://marketplace.zoom.us/docs/api-reference/webhook-reference/#ip-addresses) — provide a public list of IPs used in their service to send you webhook notifications. You can use this list to implement network restrictions and ensure only the webhook service is sending notifications. Note that this may not be possible if the webhook service does not provide a list of their origin IPs.

* **Storing secrets**: Credentials and shared secrets should be treated as confidential information and handled like private keys (stored appropriately both by the webhook service and listener in production usage).

* **Segmenting secrets:** Some services — like DocuSign — will let you adopt a unique secret for each webhook listener, allowing consumers to segment secrets and reduce the likelihood of compromise.

* **Rotating secrets:** In addition to segmentation, you can also change secrets at regular intervals or after important events — i.e., when a critical employee leaves the organization — to mitigate risk if the secret is compromised.

* **Use robust signature algorithms**: Use the strongest hashing algorithms available with the webhook signature whenever possible, such as SHA256.

* **Call back the service:** An interesting method to validate if a webhook request is legitimate is to call the service that sent the webhook from a different channel, such as their REST API, to confirm said event happened. Some services — i.e., Atlassian Jira — will include an API endpoint in the webhook body to facilitate the validation. However, this approach impacts performance and time to value.

{% diagram-callback / %}

_Webhook notification with API callback_