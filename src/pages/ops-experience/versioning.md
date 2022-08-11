---
title: Forward Compatibility and versioning
description: Providing forward compatibility 
--- 

[comment]: <TODO: @sudobinbash: add more examples>

Successful webhook implementations will evolve over time with improvements in message payload, additional functionalities, and better security controls. Webhook providers that apply versioning in webhook requests — typically via header — enable a more seamless transition to consumers to adopt improvements.

[Hubspot](https://developers.hubspot.com/docs/api/webhooks/validating-requests) is an example of a provider that changed versions of its webhook notification over the years. In its initial version (v1), Hubspot signed only the webhook request body to validate calls. Over the years, Hubspot improved its webhooks to include timestamp validation, changed the webhook signature contents, and changed the encoding from hex to base64.  By informing the webhook signature version to the listener (via a header value or within the signed message), Hubspot made forward compatibility possible without breaking legacy endpoints. The versioning also allowed Hubspot to rollout webhook improvements per event basis, reducing the migration complexity for both provider and consumers.