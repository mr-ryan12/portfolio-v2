---
paths:
  - "app/routes/**"
---

# API Route Rules

- All async logic inside loaders and actions MUST be wrapped in `try/catch`
- Loaders and actions MUST return safe, structured responses and MUST NOT allow unhandled promise rejections
- Never expose raw stack traces, internal implementation details, or sensitive debugging output to end users
- Input validation MUST be added for every action that accepts user-submitted data
- Prefer small, typed loader/action return shapes over loosely structured objects
- Initial route data MUST come from loaders, not client-side `useEffect`
- Browser-only APIs (`window`, `document`, `localStorage`) MUST NOT be used in loaders/actions
- Unexpected server-side errors SHOULD be logged with route/action context during development