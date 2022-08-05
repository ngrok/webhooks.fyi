# Microsoft Teams

<img src="https://logo.clearbit.com/microsoft.com" />

-----------------

## Overview

- **Security Method:** HMAC
- **Documentation:** https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook?tabs=verifyhmactoken%2Cdotnet

## Security Features

- **Hash Algorithm:** sha256
- **Encode:** base64
- **Secret:** Decoded Secret
- **Zero Downtime Rotation:** no
- **Forward Compatibility:** no
- **Timestamp:** no

## Header Signature

- **Signature Header:** `Authorization`
- **Signature Header format:** `HMAC <hash>`

## Signature Format

- **Hash Signature Contents:** `request body`

## Steps to validate the signature

1. Base64 decode the secret provided by Microsoft Teams
2. Extract the request body
3. Sign with the secret using HMAC-SHA256 and Base64
4. Extract the value of the `Authorization` after `HMAC `: `HMAC <hash signed by microsoft>`.
5. Compare the hash signed by Microsoft with your signed hash from step 3.
