# SvelteKit Frontend Starter

SvelteKit + TypeScript + Tailwind starter with a scalable, layer-based frontend architecture.

## Stack

- SvelteKit
- TypeScript (strict)
- Tailwind CSS v4

## Scripts

```sh
npm run dev
npm run build
npm run preview
npm run check
npm run architecture:check
```

## Architecture

Architecture guide: `docs/ARCHITECTURE.md`
Contribution rules: `CONTRIBUTING.md`

Core aliases configured in `svelte.config.js`:

- `$core`
- `$pages`
- `$processes`
- `$widgets`
- `$features`
- `$entities`
- `$shared`
- `$server`
- `$styles`

## Recommended Workflow

1. Add domain models to `entities`.
2. Implement user actions in `features`.
3. Compose route screens in `routes` and optional `pages` layer.
4. Compose large reusable blocks in `widgets`.
5. Orchestrate long flows in `processes` (optional).
6. Keep cross-domain helpers in `shared`.

## Public API Rule

Each layer/slice should expose stable exports via `index.ts`.

## Tests And Stories

Prefer co-location near source files:

- `Component.svelte`
- `Component.test.ts`
- `Component.stories.ts`

This keeps the project flexible as the codebase grows.
