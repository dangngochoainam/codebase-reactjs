# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # TypeScript compile + Vite production build
npm run lint       # ESLint check
npm run preview    # Preview production build locally
```

There are no test commands configured in this project.

## Architecture

Feature-based React 19 app using Vite + TypeScript. The key design principle is that each feature is self-contained under `src/features/`, while shared infrastructure lives in `src/core/`.

### Routing

Each feature exports its own routes array from a `routes.ts` file. All routes are aggregated in [src/router.ts](src/router.ts) and passed to `useRoutes()`. The root `BrowserRouter` is in [src/main.tsx](src/main.tsx).

To add a new feature, define routes in `src/features/YourFeature/routes.ts` and import them into `src/router.ts`.

### Auth State

Auth uses Context API + useReducer (no Redux). The state shape is `{ isAuthenticated, user }` managed by an `authReducer` that handles `SIGN_IN` / `SIGN_OUT` actions.

- `useAuth()` — read auth state
- `useToken()` — get the access token
- `useAuthDispatch()` — dispatch auth actions

On app load, [AuthContextProvider](src/core/auth/contexts/AuthContextProvider.tsx) calls `auth/refresh-token` to restore session. It guards against React StrictMode double-invocation.

### HTTP Client

All API calls go through the custom fetch wrapper at [src/core/lib/utils/http.ts](src/core/lib/utils/http.ts). It:
- Prepends `VITE_API_URL` (configured in `.env`) as the base URL
- Includes credentials (cookies) automatically
- Expects responses conforming to `BaseHttpResponse` with a `statusCode` from the `StatusCode` enum (`ACCEPT`, `REJECT`, `PROCESSING`, `ERROR`)

Pass auth token via the `Authorization` header in each feature hook:
```typescript
const headers = useMemo(() => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
}), [token]);
```

### UI Components

shadcn/ui components are in [src/core/components/shadcn/](src/core/components/shadcn/). The path alias `@/` maps to `src/`. Component configuration is in [components.json](components.json).

### Environment

Copy `.env.example` to `.env`. The only required variable is:
```
VITE_API_URL=http://localhost:50051/v1
```

### Docker / CI

- `docker-compose.yaml` — local/dev container setup
- `docker-compose.prod.yaml` — production setup
- GitHub Actions CI (`.github/workflows/ci.yaml`) triggers on push to `develop`, builds and pushes a Docker image to Docker Hub with git SHA and `latest` tags.
