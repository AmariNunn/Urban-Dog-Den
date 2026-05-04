# Workspace — Bawse Dawgs Ordering Site

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Payments**: Stripe (hosted checkout, `price_data` dynamic line items)

## Payments Architecture

Stripe is integrated for checkout. The site is built for **Netlify deployment**:

- **On Netlify**: `artifacts/bawse-dawgs/netlify/functions/create-checkout.ts` handles checkout session creation (serverless function at `/.netlify/functions/create-checkout`)
- **In dev (Replit)**: Vite proxies `/.netlify/functions/create-checkout` → `http://localhost:8080/api/checkout` (Express route in `artifacts/api-server/src/routes/checkout.ts`)
- **Success page**: `/order/success` — `artifacts/bawse-dawgs/src/pages/OrderSuccess.tsx`
- **Required secrets**: `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`
- No products need to be pre-created in Stripe — items are passed as `price_data` at checkout time
- Netlify function also at: `artifacts/bawse-dawgs/netlify/functions/stripe-webhook.ts` (requires `STRIPE_WEBHOOK_SECRET` env var)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
