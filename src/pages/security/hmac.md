---
title: Hash-based Message Authentication Code (HMAC)
description: HMAC is, by far, the most popular authentication and message security method used on webhook requests, including 65% of the 100 webhooks we studied. In this method, the webhook provider and listener use a secret key to sign and validate webhook requests.
--- 

{% table %}
---
* **Complexity**
* - Low
---
* **Pros**
* - Authentication and Message Integrity with Low Complexity
  - Secret keys are not sent in the webhook notification
  - Hash signature enables timestamp validation
---
* **Caveats**
* - No confidentiality controls
  - Introduces additional complexity with complex signature payloads
---
* **Examples**
* - [GitHub](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks)
  - [Shopify](https://shopify.dev/apps/webhooks/configuration/https#step-5-verify-the-webhook)
  - [Slack](https://api.slack.com/authentication/verifying-requests-from-slack)
  - [Square](https://developer.squareup.com/docs/webhooks/step3validate)
  - [Twilio](https://www.twilio.com/docs/usage/security#validating-requests)
{% /table %}
---

Hash-based Message Authentication Code (HMAC) is, by far, the most popular authentication and message security method used on webhook requests, including 65% of the webhooks we studied. In this method, the webhook provider and listener use a secret key to sign and validate webhook requests.

1. On webhook requests, the provider signs the webhook message using the secret key plus a hashing algorithm — typically `HMAC-SHA256`, encodes the resulting signature in `base64` or `hex`, and then includes the signature in the webhook request as a header.
1. The webhook listener receives the request and repeats the same steps — signs and encodes the webhook message using the secret key — and compares the resulting signature with the value sent in the request header. If the result matches, the request is considered legitimate.

    ```js
    const signatureHeader = 'Signature-Header'
    const signatureAlgorithm = 'sha256'
    const encodeFormat = 'hex'
    const hmacSecret = process.env.WEBHOOK_SECRET

    app.post('/webhook', (req, res) => {
      // Create digest with payload + hmac secret
      const hashPayload = req.rawBody
      const hmac = crypto.createHmac(signatureAlgorithm, hmacSecret)
      const digest = Buffer.from(signatureAlgorithm + '=' + hmac.update(hashPayload).digest(encodeFormat), 'utf8')
      
      // Get hash sent by the provider
      const providerSig = Buffer.from(req.get(signatureHeader) || '', 'utf8')

      // Compare digest signature with signature sent by provider
      if (providerSig.length !== digest.length || !crypto.timingSafeEqual(digest, providerSig)) {
        res.status(401).send('Unauthorized')
      }else{
        // Webhook Authenticated 
        // process and respond...
        res.json({ message: "Success" })
      }
    })
    ```

{% diagram-hmac / %} 

_Request Signature Validation_

## HMAC vs. Shared Secrets

HMAC offers the following advantages over Basic Authentication:

1. **Authentication + message integrity**: Assuming the secret key is known only by the webhook provider and the listener, the HMAC process verifies that the message comes from the webhook provider (authenticity) and its contents are the same as they were at the time of sending (integrity).
1. **The secret key remains secret:** In HMAC, secret keys are not sent with the webhook request — only the signatures created with it — reducing the risk of stolen keys.

## HMAC is only as good as its implementation

[comment]: <TODO: @sudobinbash: Launch blog>
[comment]: <Like any other security control, HMAC is only as good as its implementation. In our research, we saw many examples of webhook providers with unnecessary complexity, lack of features, and documentation that made their solutions tough to implement and keep safe — more on that in our [article](https://blog.ngrok.com/posts/get-webhooks-secure-it-depends-a-field-guide-to-we). Good webhook implementations will typically:>

Like any other security control, HMAC is only as good as its implementation. In our research, we saw many examples of webhook providers with unnecessary complexity, lack of features, and complex documentation that made their solutions tough to implement and keep safe. Good webhook implementations will typically:

1. Use strong hash algorithms such as `sha256` and `sha512`
1. Add sensitive headers to the hash digest:
    ```js
    ...
    const clientIdHeader = 'clientid'
    ...
    app.post('/webhook', (req, res) => {
      // Create digest from the request payload and the clientid header
      const hashPayload = req.rawBody+'.'+req.get(clientIdHeader)
      const hmac = crypto.createHmac(signatureAlgorithm, hmacSecret)
      const digest = Buffer.from(signatureAlgorithm + '=' + hmac.update(hashPayload).digest(encodeFormat), 'utf8')
      ...
    })
    ```
1. Leverage HMAC signatures to implement [replay prevention](/security/replay-prevention), [versioning](/ops-experience/versioning), and [key rotation](/ops-experience/key-rotation)
1. Provide great [documentation](/ops-experience/documentation) and features for better [operations](/ops-experience/intro)