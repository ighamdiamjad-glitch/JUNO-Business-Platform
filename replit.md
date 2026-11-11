# JUNO

A bilingual workspace for business planning and digital marketing, built in reviewed phases.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

JUNO is being developed as an AI-powered business management and digital marketing workspace. The current Phase 1 app is a frontend foundation; the assistant, authentication, database-backed storage, integrations, and AI actions are not connected yet. Do not describe planned capabilities as available.

## JUNO-wide AI guidance

The complete, user-provided behavioral specification is `attached_assets/Pasted-Comprehensive-AI-Instructions-for-Document-Formatting-P_1794383294597.txt`. Treat it as the source of truth for all future JUNO AI behavior—not only document formatting. Apply the relevant parts to assistant answers, project and business analysis, marketing, reports, plans, and recommendations. Keep the original file intact.

Core rules:

- Preserve source information and meaning when asked to process source material. Never invent facts, figures, outcomes, features, accounts, services, suppliers, prices, availability, links, or research.
- Separate verified facts from assumptions, potential risks, recommendations, and future proposals. State what is missing or unverified instead of guessing.
- Preserve technical names, terminology, code, data, and relationships exactly where required. Do not omit source details merely because they are repetitive.
- For Arabic output, use correct connected Arabic text, right-to-left direction, and the specified IBM Plex Sans Arabic typography. Keep documents professional, readable, and consistently structured.
- Analyze security, privacy, and Saudi PDPL considerations when relevant. Distinguish evidence-backed findings from potential risks; never label a vulnerability confirmed without sufficient evidence.
- For marketing, current trends, suppliers, prices, or other changing information, use recent reliable evidence and clearly identify anything not verified. Never invent performance metrics.
- Keep plans realistic and grounded in known scope, budget, resources, responsibilities, and dates. Mark unknowns rather than fabricating them.
- Do not imply that this guidance means an AI feature or integration is already implemented. Apply it in the runtime assistant only when that feature is built and connected.

## User preferences

JUNO-specific AI requirements are documented in the guidance above and its linked source specification.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
