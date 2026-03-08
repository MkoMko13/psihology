# Contributing

## Architecture Contracts

- Follow `docs/ARCHITECTURE.md`.
- Keep imports through slice public API (`index.ts`) when possible.
- Do not import `features` from `widgets`.
- Do not import `$server` from client-side modules.

## Naming Conventions

- Feature folders must use `camelCase`.
- Components use `PascalCase.svelte`.
- Stores, hooks, and utilities use `camelCase.ts`.

## Slice Structure (recommended)

- `ui/` for presentation components
- `model/` for state and business model
- `api/` for network/query adapters
- `index.ts` for public API

## Tests And Stories

Keep tests and stories close to source files:

- `Component.svelte`
- `Component.test.ts`
- `Component.stories.ts`
- `model.test.ts`

## Pull Request Checklist

- Architecture boundaries preserved.
- New slice exports are added to `index.ts`.
- Naming conventions are respected.
- Tests/stories updated where relevant.
