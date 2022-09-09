---
title: Standardization Efforts
description: Learn more about the standardization efforts on webhook communications and security
---

## Standardization Efforts

Today, service providers take different approaches when designing and delivering webhooks, leading to inconsistency and complexity in the marketplace. 
While we couldn't find an active standardization effort dedicated to webhooks, these projects can help standardize how webhooks — and events in general — are built, secured, and consumed, making it easier for both providers and consumers to integrate:

## IETF HTTP Message Signatures

HTTP Signatures describes a method of creating, encoding, and verifying signatures within HTTP requests. This spec can be used on various applications, including most webhook implementations (over 65% of the webhook implementations rely on signatures for authentication and message integrity). HTTP Signatures is one of the specs in progress under the [IETF HTTP Extensions Working Group](https://httpwg.org/http-extensions/).

[Learn More >](https://httpwg.org/http-extensions/draft-ietf-httpbis-message-signatures.html)

## OpenID's Shared Signals and Events (SSE)

The Shared Signals and Events (SSE) is an OpenID Foundation initiative focused on establishing a framework for security solutions to send events to each other. While the SSE framework focuses on security, it relies heavily on webhooks as a way to communicate events asynchronously.

[Learn More >](https://sharesignals.guide/)

## CloudEvents

CloudEvents is a specification for describing event data in a common way. The specification includes [webhooks](https://github.com/cloudevents/spec/blob/main/cloudevents/http-webhook.md) and seeks to simplify event declaration and delivery across systems. CloudEvents is a new effort and is still under active development by the Cloud Native Computing Foundation (CNFC).

[Learn More >](https://cloudevents.io/)

## REST Hooks

REST Hooks are an initiative ran by Zapier ran from 2013 to 2017. Their goal was to create a collection of patterns for treating webhooks like subscriptions with a [minimum implementation walktrhough](http://resthooks.org/docs/). 

[Learn More >](https://github.com/zapier/resthooks)
