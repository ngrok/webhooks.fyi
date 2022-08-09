---
title: Forward Compatibility
description: Webhook security Forward Compatibility 
--- 

In addition to the key rotation, some providers implement versioning within their signatures, allowing for future upgrades in the hash algorithm and signature process. [Hubspot](https://developers.hubspot.com/docs/api/webhooks/validating-requests) is an example of a provider that changed versions of its webhook notification over the years. In its initial version (v1), Hubspot signed only the webhook request body to validate calls. Over the years, Hubspot improved its webhooks to include timestamp validation, changed the webhook signature contents, and changed the encoding from hex to base64.  Informing the webhook signature version to the listener (via a header value or within the signed message) makes forward compatibility possible without breaking legacy endpoints.