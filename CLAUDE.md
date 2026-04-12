# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start Vite development server
npm run build      # Type-check (tsc -b) then build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

There is no test runner configured in this project.

## Architecture

This is a **feature-based React + TypeScript + Vite** boilerplate/admin dashboard. Each feature is a self-contained module.

### Feature Modules (`src/features/`)

Every feature follows the same internal structure:
```
features/FeatureName/
├── components/     # UI components specific to this feature
├── hooks/          # Custom hooks (data fetching, business logic)
├── types/          # TypeScript interfaces/types
├── views/          # Page-level components (rendered by routes)
└── routes.ts       # Route definitions exported and aggregated in src/router.ts
```

Current features: `Auth`, `Product`, `User-Management`, `Wellcome`.

**Adding a new feature:** create the folder structure above, define routes in `routes.ts`, and import/spread them into `src/router.ts`.

### Core (`src/core/`)

Global, feature-agnostic code:
- `auth/` — Auth context (`AuthContext` + `AuthDispatchContext`), reducer (SIGN_IN / SIGN_OUT actions), and hooks (`useAuthContext`, `useAuthDispatch`, `useToken`)
- `components/shadcn/` — Shadcn UI components (Button, Input, Form, Label, etc.)
- `configs/env.ts` — Reads `VITE_API_URL` from environment
- `layouts/` — `FullLayout.tsx` with Header and Sidebar (wraps protected routes)
- `lib/utils/http.ts` — `httpRequest<R>()` utility (see API section below)
- `lib/utils/storage.ts` — `localStorage` wrapper class

### Routing

Routes are defined per-feature and merged centrally:
```ts
// src/router.ts
import { authRoutes } from "@/features/Auth/routes";
import { productRoutes } from "@/features/Product/routes";
// ...
export const routes = [...authRoutes, ...productRoutes, ...];
```

Protected routes are wrapped with `FullLayout`, which renders only when the user is authenticated.

### Authentication

**Provider:** `AuthContextProvider` in `src/core/auth/` wraps the app in `main.tsx`. On mount it calls `auth/refresh-token` to restore the session (uses a `useRef` guard to prevent double-invocation in StrictMode).

**State shape:**
```ts
{ isAuthenticated: boolean; user: { userId, name, email, accessToken? } | null }
```

Tokens are stored as HTTP-only cookies (all requests use `credentials: "include"`). The access token is also available on `user.accessToken` for use in `Authorization` headers.

**Hooks:**
- `useAuthContext()` — read auth state
- `useAuthDispatch()` — dispatch SIGN_IN / SIGN_OUT
- `useToken()` — get current access token

**Auth feature hooks** (`src/features/Auth/hooks/useAuth.ts`): `signIn()`, `signUp()`, `signInWithGoogle()`. Forms use React Hook Form + Zod.

### API Layer

**Utility:** `src/core/lib/utils/http.ts` — `httpRequest<R>(url, options?)` wraps native `fetch`. It throws if `statusCode !== "ACCEPT"`.

**Base URL:** `VITE_API_URL` from `.env` (see `.env.example`).

**Pattern for protected endpoints:**
```ts
const token = useToken();
httpRequest(`${API_URL}/resource`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

Feature data-fetching hooks (e.g. `useUsers`, `useProducts`) encapsulate this pattern and expose typed functions.

### Styling

- **TailwindCSS v4** with Vite plugin (no `tailwind.config.js` needed)
- **Shadcn UI** for component primitives — components live in `src/core/components/shadcn/`
- Path alias `@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`)

### TypeScript

Strict mode is on: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports` are all enabled. Code must compile cleanly with `tsc -b` before shipping.
