# Aftership

<img src="https://logo.clearbit.com/aftership.com" />

-----------------

## Overview

- **Security Method:** HMAC
- **Documentation:** https://developers.aftership.com/reference/check-signatures

## Security Features

- **Hash Algorithm:** sha256
- **Encode:** base64
- **Secret:** Shared Secret
- **Zero Downtime Rotation:** no
- **Forward Compatibility:** no
- **Timestamp:** no

## Header Signature

- **Signature Header:** `aftership-hmac-sha256`
- **Signature Header format:** hash

## Signature Format

- **Hash Signature Contents:** `request body`

## Steps to validate the signature

1. Extract the request body
2. Sign with the Shared secret using HMAC-SHA256 and Base64
3. Compare generated hash versus the contents of `aftership-hmac-sha256`
