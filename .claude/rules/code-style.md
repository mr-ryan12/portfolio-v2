# Code Style

- TypeScript `strict` mode MUST remain enabled
- Explicit return types MUST be added to all non-trivial exported functions
- The `~/*` path alias resolves to `app/*` and SHOULD be preferred over long relative imports
- Route modules MUST follow React Router conventions and keep loader/action code separated from presentational UI where practical
- File size SHOULD generally stay under 300 lines, but files may exceed that when keeping related logic together improves cohesion
- Functions SHOULD use clear verb-based names; variables SHOULD use clear noun-based names
- Ambiguous names like `data`, `info`, and `stuff` MUST be avoided outside narrow local scopes
- New dependencies MUST NOT be added unless the spec or implementation clearly justifies them
- Repeated logic MUST be extracted into shared utilities or helpers; copy/paste reuse is prohibited
- Presentational components SHOULD remain focused on rendering and receive data via props rather than importing route data sources directly
- Prefer small, composable components over large multi-purpose components