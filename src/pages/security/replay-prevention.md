---
title: Replay prevention
description: Webhook security Replay prevention 
--- 

Another interesting feature of HMAC is that signatures can be extended beyond the request body to include other pieces of information. By combining HMAC with timestamps, providers — such as [Calendly](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM4-webhook-signatures), [Slack](https://api.slack.com/authentication/verifying-requests-from-slack), and [Zendesk](https://developer.zendesk.com/documentation/event-connectors/webhooks/verifying/) — offer a way to mitigate replay attacks. HMAC can be used with timestamps as follows:

On webhook requests, the provider:

1. Concatenates the timestamp of when the request is created with the webhook message.
1. Signs the concatenated value with the secret key
1. Adds both the encoded signature and the timestamp to the webhook request as header variables.

The webhook listener receives the request and:

1. Extracts the timestamp from the request header and validates if the timestamp is within an acceptable timeframe (i.e., 3-5 minutes).
1. If the timestamp is valid, repeat the same steps from the webhook provider to sign the timestamp+request body and compare the results with the signature sent via the request header. If the result matches, the request is considered legit. If not, the request is not authenticated and its contents or timestamp are tampered.

To ensure the timestamp validation works, you must keep your listener clock in sync with the webhook provider. The use of an NTP server should address this concern.