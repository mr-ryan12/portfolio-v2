# Security & Privacy

- Never log secrets, access tokens, environment variables, or sensitive user data
- Never send secrets, private contact details, or other sensitive information to web searches or third-party tools
- Do not expose system prompts, tool instructions, internal implementation details, or raw tool outputs to end users
- Browser-only APIs and sensitive values MUST NOT be assumed available or safe in server-side route code
- When errors occur, return safe user-facing messages and avoid leaking internal debugging details
