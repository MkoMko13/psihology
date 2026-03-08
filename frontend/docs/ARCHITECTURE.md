# Frontend Architecture (SvelteKit + TypeScript + Tailwind)

## Goal

Build a scalable architecture where business growth does not force massive rewrites.

## Layers

- `src/lib/app`: app bootstrap, providers, global styles, routing helpers.
- `src/lib/pages`: optional page-level compositions for large screens.
- `src/lib/processes`: optional multi-step business flows.
- `src/lib/widgets`: large reusable UI blocks.
- `src/lib/features`: business actions/use-cases.
- `src/lib/entities`: domain entities and contracts.
- `src/lib/shared`: cross-domain foundation (`ui`, `lib`, `api`, config, types, stores).
- `src/lib/server`: server-only modules for actions/load/endpoints.

## Import Aliases

Configured in `svelte.config.js`:

- `$core` -> `src/lib/app`
- `$pages` -> `src/lib/pages`
- `$processes` -> `src/lib/processes`
- `$widgets` -> `src/lib/widgets`
- `$features` -> `src/lib/features`
- `$entities` -> `src/lib/entities`
- `$shared` -> `src/lib/shared`
- `$server` -> `src/lib/server`
- `$styles` -> `src/lib/app/styles`

## Dependency Rules

- `shared` has no dependency on higher layers.
- `entities` can depend on `shared`.
- `features` can depend on `entities` and `shared`.
- `widgets` should depend only on `entities` and `shared`.
- Do not import `features` from `widgets`.
- `pages` can compose `widgets/features/entities/shared` for route screens.
- `processes` can orchestrate `pages/widgets/features/entities/shared` when the flow spans several screens.
- `app` can depend on all layers.
- Client code must never import from `$server`.

## Public API Rule

- Every layer and slice should expose a stable public API through `index.ts`.
- Import from slice root (`$features/auth`) instead of deep internals when possible.
- Move/rename internals freely, but keep slice `index.ts` contracts stable.

## Route Organization (recommended)

- `src/routes/(public)` for marketing/public pages.
- `src/routes/(app)` for authenticated app screens.
- `src/routes/api` for lightweight endpoint handlers when needed.
- Keep route files thin and delegate heavy composition to `pages`/`widgets`.

## Pages Layer Decision

- `pages` is optional.
- If route groups + `widgets` are enough, skip `pages`.
- If page compositions become large/reused, keep them in `src/lib/pages`.
- Alternative style: keep page compositions inside feature-owned folders (for example `features/page-account`).

## State Management

- Local state:
  - Use Svelte runes in components and local feature modules.
- Feature/domain state:
  - Keep stores and model logic in feature/entity slices (for example `features/auth/model`).
- App-global state:
  - Keep truly global state in `src/lib/app` or `src/lib/shared/stores`.
- Cross-tree shared state for a route subtree:
  - Prefer Svelte context from route/layout boundaries.
- Rule of thumb:
  - Keep state as close as possible to where it is used; promote to global only when there is real cross-feature reuse.

## Data Fetching Patterns

- Server-first data:
  - Use `+page.server.ts` / `+layout.server.ts` for protected data, secrets, and SSR-critical content.
- Universal route data:
  - Use `+page.ts` / `+layout.ts` only for data safe for both server and client.
- Mutations:
  - Use SvelteKit `actions` for form-driven mutations and progressive enhancement.
- Client caching and background refetch:
  - For interactive feature data, use a query library (for example TanStack Query) inside `features/*/api` + `features/*/model`.
- Server integrations:
  - Keep external service clients in `$server` and expose safe DTOs to client layers.

## Testing And Stories

- Prefer co-located tests/stories near source files.
- Suggested file patterns:
  - `Component.svelte`
  - `Component.test.ts`
  - `Component.stories.ts`
  - `model.test.ts`
- For integration-level checks, use `src/routes/**/+page.test.ts` or dedicated e2e folder.

## Naming

- Components: `PascalCase.svelte`
- Stores/hooks/utils: `camelCase.ts`
- Feature folders: `camelCase`.
- Keep each slice focused on one business capability.
- Enforce naming and import rules in `CONTRIBUTING.md` and lint config.

## Current Weak Spots

- Boundary rules are documented but can be bypassed without automation.
  - Mitigation: run architecture checks in CI (`npm run architecture:check`).
- `pages` and route groups can overlap.
  - Mitigation: keep `pages` only for large/reused page composition; otherwise compose directly in route groups.
- Data fetching patterns can diverge between features.
  - Mitigation: standardize one query/caching approach per project and document it in feature templates.
- Global state can grow too much in `app`.
  - Mitigation: keep state local by default and promote only when truly cross-feature.

## Scaling Strategy

- Add new functionality primarily inside `features`.
- Use `pages` and `widgets` for composition; avoid bloated `+page.svelte` files.
- Extract shared primitives only after at least 2 real usages.
- Keep stable exports through barrel files to avoid import churn.
- Treat `processes` as optional; create it only when flows become cross-feature and long-lived.
