---
title: Documentation
description: Documentation
--- 

Delightful developer and ops experience starts with docs that are easy to understand, complete, and insightful. Given each webhook implementation's uniqueness, good documentation is crucial for building webhook consumers fast and safely. Great webhook documentations provide:

[comment]: <TODO: @sudobinbash: add good examples we found>
1. An overview of when webhooks should be used
1. A list of events supported and how to subscribe to events 
1. (If one-time verification check exists), how to perform the verification
1. A comprehensive list of the security features and why they exist, 
1. The journey (steps) for receiving, validating, and processing webhook events.
1. Example payloads
1. Complete sample code
1. How to operate and & retry when webhook messages are lost (i.e. due to outages)
1. Information that can enable compensatory controls, such as list of IPs for firewall rules

Unfortunately, we found webhook documentation that makes knowledge assumptions, skips steps, and consistently delivers incomplete code snippets. About 10% of the webhooks we've implemented missed critical information in their docs — including lack of the encoding format (base64 or hex), the signature date format (Unix or RFC 3339), and hash signature payload instructions. To overcome incomplete docs, we spent significant time performing guess work, scraping the internet, and unit testing webhooks until finding something that made sense. While we were motivated to continue digging and researching to get the correct answer, many developers would have skipped verifying webhooks out of frustration.
