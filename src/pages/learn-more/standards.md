---
title: Standardization Efforts
description: Learn more about the standardization efforts on webhook communications and security
---

## Standardization Efforts

Today, service providers take different approaches when designing and delivering webhooks, leading to inconsistency and complexity in the marketplace. 
While we couldn't find a standardization effort focused on improving webhook communications, these projects can help standardize how webhooks are built, secured, and consumed in specific use cases, making it easier for both providers and consumers to integrate:

## IETF HTTP Message Signatures

HTTP Signatures describes a method of creating, encoding, and verifying signatures within HTTP requests. This spec can be used on various applications, including most webhook implementations (over 65% of the webhook implementations rely on signatures for authentication and message integrity). HTTP Signatures is one of the specs in progress under the [IETF HTTP Extensions Working Group](https://httpwg.org/http-extensions/).

[Learn More >](https://httpwg.org/http-extensions/draft-ietf-httpbis-message-signatures.html)

## OpenID's Shared Signals and Events (SSE)

The Shared Signals and Events (SSE) is an OpenID Foundation initiative focused on establishing a framework for security solutions to send events to each other. While the SSE framework focuses on security, it relies heavily on webhooks as a way to communicate events asynchronously.

[Learn More >](https://openid.net/wg/sse/)
