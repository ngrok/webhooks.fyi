---
title: Best Practices for Webhook Providers
description: Security Best Practices for Webhook Providers
--- 

## Provide amazing documentation

In webhook communications, the authentication, message integrity validation, and replay prevention validation, and enforcement happen on the webhook listener. Therefore, webhook providers must simplify the work on developers by providing documentation with:
    * **Complete specs on your webhook security,** including the authentication mode, cipher suite, signature procedure, and best practices for security.
    * **A description of the steps to validate your webhook messages**.
    * **A sample code** (not a pseudo-code) developers can run to understand how webhook notifications should be processed
    * **Instructions on how developers can test your webhooks** against their code running on localhost
    * **Provide a mechanism to trigger, test, and replay webhooks calls** with a close feedback loop

## Implement security on egress communication

Webhook integrations seem simple to secure at the surface. However, webhook URLs can be explored by malicious actors — acting as legitimate webhook consumers — to carry out Distributed Denial of Service (DDoS), Server Site Request Forgery (SSRF), and other attacks to the provider infrastructure as described by [cuu408](https://news.ycombinator.com/item?id=32518208):

> There are some interesting attack vectors to be aware of if you run a service where users can define webhooks, and your service will will call the user-defined webhooks to notify about certain system events. In my case, a monitoring service which can send notifications by calling user-defined webhook.
> * Timeouts: the user can set up a webhook receiver that takes very long to generate a response. Your service must be able to deal with that.
> * Timeouts (slowloris): the webhook target could be sending back one byte at a time, with 1 second pauses inbetween. If you are using, say, the "requests" python library for making HTTP requests, the "timeout" parameter will not help here
> * Private IPs and reserved IPs: you probably don't want users defining webhooks to http://127.0.0.1:<some-port> and probing your internal network. Remember about private IPv6 ranges too
> * Domains that resolve to private IPs: attacker could set up foo.com which resolves to a private IP. It is not enough to just validate webhook URLs when users set them up.
> * HTTP redirects to private IPs. If your HTTP client library follows HTTP redirects, the attacker can set up a webhook endpoint that redirects to a private IP. Again, it is not enough to validate the user-supplied URL.
> * Excessive HTTP redirects. The attacker can set up a redirect loop - make sure this does not circumvent your timeout setting.
> My current solution for all of the above is to use libcurl via pycurl. I wrote a wrapper that mimics requests API: https://github.com/healthchecks/healthchecks/blob/master/hc/... (may contain bugs, use at your own risk :-)

Webhook providers must implement security controls to mitigate these issues. This can be done at the code level or by using egress proxies for webhook traffic such as [webhook-sentry](https://github.com/juggernaut/webhook-sentry) and [smokescreen](https://github.com/stripe/smokescreen)

## Secret keys

* Consider using asymmetric keys for non-repudiation
* Consider individualizing secret keys per listener
* Implement a key rotation with zero downtime (i.e., signing webhook messages with multiple keys) so webhook listeners can rotate keys regularly. You can also automate the key rotation by implementing APIs that listeners can call to fetch new keys autonomously.

## Encryption and hashing algorithm

* Do not use old ciphers or hashing algorithms such as SHA-1 and MD5.
* For HMAC, use at least SHA-256

## Signature Payload

* Concatenate body, timestamp, and sensitive headers to form the payload. 
* Don't add unnecessary steps to the signature, such as changing the payload capitalization and adding line breaks.

## Replay Prevention

* Timestamps provides a simple way to validate if requests have been sent recently and reduce the risk of message replays. 
* When adopting timestamps, consider using Unix timestamp as format (7 of 10 webhook providers), and provide a recommendation of how long messages should be considered valid in your documentation. 
* Also, ensure to include the timestamp on the message integrity verification to reduce the risk of tampering.

## Versioning

* All security implementations are subject to new vulnerabilities. Consider adding a version header to your webhook messages or the hash signature to provide forward compatibility

## Compensatory controls

* Whenever possible, list the IP origins for webhook messages. This information allows developers to implement IP policies in their listeners for additional security
* Provide a convenient way for listeners to verify the validity of a webhook call, such as including a webhook receipt URL/API within the webhook message.