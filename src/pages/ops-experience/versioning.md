---
title: Forward Compatibility and versioning
description: Successful webhook implementations will naturally evolve with improvements. Great webhook providers send version information in webhook requests to enable a more seamless transition to consumers to adopt improvements. 
--- 

Successful webhook implementations will naturally evolve with improvements in messaging, new features, and better security controls. Webhook providers — such as [PagerDuty](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures), [Circle CI](https://circleci.com/docs/2.0/webhooks/), and [Brex](https://developer.brex.com/docs/webhooks/) — send version information in webhook requests to enable a more seamless transition to consumers to adopt improvements. 

The webhook version can be sent in multiple ways:

- On the signature payload:
    ```
    X-PagerDuty-Signature:
    v1=f03de6f61df6e454f3620c4d6aca17ad072d3f8bbb2760eac3b2ad391b5e8073,
    v1=130dcacb53a94d983a37cf2acba98e805a1c37185309ba56fdcccbcf00d6dd8b
    ```
- On a dedicated signature header:
    ```
    BOX-SIGNATURE-VERSION: 1
    ```
- As part of the signature header name:
    ```
    X-HubSpot-Signature-v3: <signed value>
    ```

[Hubspot](https://developers.hubspot.com/docs/api/webhooks/validating-requests) is an example of a provider that changed versions of its webhook notification over the years. In its initial version (v1), Hubspot signed only the webhook request body to validate calls. Over the years, Hubspot improved its webhooks to include timestamp validation, changed the webhook signature contents, and changed the encoding from hex to base64.  

By informing the webhook signature version to the listener (via a header value or within the signed message), Hubspot made forward compatibility possible without breaking legacy endpoints. The versioning also allowed Hubspot to rollout webhook improvements per event basis, reducing the migration complexity for both provider and consumers.