# Box

<img src="https://logo.clearbit.com/box.com" alt="Box Logo"/>

-----------------

## Overview

- **Security Method:** HMAC
- **Documentation:** https://developer.box.com/guides/webhooks/v2/signatures-v2/

## Security Features

- **Hash Algorithm:** sha256
- **Encode:** base64
- **Secret:** Shared Secret
- **Zero Downtime Rotation:** yes
- **Forward Compatibility:** no
- **Timestamp:** yes

## Header Signature

- **Signature Headers:** `box-signature-primary` and `box-signature-secondary`
- **Signature Header format:** `hash`

## Versioning

- Provided by the `box-signature-version` header

## Timestamp

- **Timestamp Header:** `box-delivery-timestamp`
- **Timestamp Format:** RFC3339

## Signature Format

- **Hash Signature Contents:** `timestamp+"."+request body`

## Steps to validate the signature

1. Extract the timestamp from `box-delivery-timestamp`
2. Check the timestamp versus your tolerance (i.e. 5 minutes) to mitigate replay attacks.
3. Concatenate the timestamp from step 1 and the request in the following format: `timestamp+"."+request body`
4. Sign the contents from step 3 using HMAC-SHA256 and Base64
4. Extract the value of both the `box-signature-primary` and the `box-signature-secondary` headers.
5. Compare both hashes signed by Box with your signed hash from step 4 and confirm if any of the signatures match.
