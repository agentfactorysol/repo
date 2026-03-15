# Security Policy

## Scope

Security disclosures relevant to Agent Factory include:

- Vulnerabilities in wallet connection or key handling logic
- Issues with token deployment or trade execution flows
- Exploits in the API routes (injection, auth bypass, SSRF)
- Vulnerabilities in the web application (XSS, CSRF)
- Exposure of private keys or API credentials

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report vulnerabilities privately by opening a security advisory on this repository. Include:

- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested mitigations

We will acknowledge receipt within 48 hours and aim to resolve critical issues within 7 days.

## Responsible Disclosure

We ask that you:

- Give us reasonable time to investigate and fix before going public
- Do not exploit the vulnerability beyond what is needed to demonstrate it
- Do not access or modify data that is not yours

We will credit researchers who report valid vulnerabilities responsibly.

## Out of Scope

- Issues in third-party services (Solana RPC providers, PumpPortal, pump.fun)
- Theoretical vulnerabilities with no practical exploit path
- Issues already known and tracked in public issues
