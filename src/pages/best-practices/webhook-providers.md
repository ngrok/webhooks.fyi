---
title: Best Practices for Webhook Providers
description: Security Best Practices for Webhook Providers
--- 

* **Provide amazing documentation**: in webhook communications, the authentication, message integrity validation, and replay prevention validation, and enforcement happen on the webhook listener. Therefore, webhook providers must simplify the work on developers by providing documentation with:
    * **Complete specs on your webhook security,** including the authentication mode, cipher suite, signature procedure, and best practices for security.
    * **A description of the steps to validate your webhook messages**.
    * **A sample code** (not a pseudo-code) developers can run to understand how webhook notifications should be processed
    * **Instructions on how developers can test your webhooks** against their code running on localhost
    * **Provide a mechanism to trigger, test, and replay webhooks calls** with a close feedback loop

* **Secret keys**
    * Consider using asymmetric keys for non-repudiation
    * Consider individualizing secret keys per listener
    * Implement a key rotation with zero downtime (i.e., signing webhook messages with multiple keys) so webhook listeners can rotate keys regularly. You can also automate the key rotation by implementing APIs that listeners can call to fetch new keys autonomously.

* **Encryption and hashing algorithm**
    * Do not use old ciphers or hashing algorithms such as SHA-1 and MD5.
    * For HMAC, use at least SHA-256

* **Signature Payload**
    * Concatenate body, timestamp, and sensitive headers to form the payload. 
    * Don't add unnecessary steps to the signature, such as changing the payload capitalization and adding line breaks.

* **Replay Prevention**
    * Timestamps provides a simple way to validate if requests have been sent recently and reduce the risk of message replays. 
    * When adopting timestamps, consider using Unix timestamp as format (7 of 10 webhook providers), and provide a recommendation of how long messages should be considered valid in your documentation. 
    * Also, ensure to include the timestamp on the message integrity verification to reduce the risk of tampering.

* **Versioning:**
    * All security implementations are subject to new vulnerabilities. Consider adding a version header to your webhook messages or the hash signature to provide forward compatibility

* **Compensatory controls**:
    * Whenever possible, list the IP origins for webhook messages. This information allows developers to implement IP policies in their listeners for additional security
    * Provide a convenient way for listeners to verify the validity of a webhook call, such as including a webhook receipt URL/API within the webhook message.