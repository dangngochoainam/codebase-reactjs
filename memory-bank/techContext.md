# Technical Context

## Technology Stack

### Core Framework
- **React**: 19.2.0 (latest)
- **TypeScript**: ~5.9.3
- **Vite**: 7.2.4 (build tool and dev server)

### Routing
- **React Router**: 7.11.0
  - Uses `BrowserRouter` for client-side routing
  - `useRoutes` hook for route configuration
  - `RouteObject` type for type-safe routes

### UI & Styling
- **Tailwind CSS**: 4.1.18
  - Via `@tailwindcss/vite` plugin
  - Custom CSS in `src/core/assets/css/App.css`
- **shadcn/ui**: Component library
  - Components: Button, Form, Input, Label
  - Style: "new-york"
  - Base color: "neutral"
  - CSS variables enabled
- **Lucide React**: 0.562.0 (icons)
- **class-variance-authority**: 0.7.1 (component variants)
- **clsx**: 2.1.1 (conditional class names)
- **tailwind-merge**: 3.4.0 (merge Tailwind classes)

### Form Management
- **React Hook Form**: 7.68.0
- **Zod**: 4.2.1 (schema validation)
- **@hookform/resolvers**: 5.2.2 (Zod integration)

### Development Tools
- **ESLint**: 9.39.1
  - `@eslint/js`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
  - `typescript-eslint`
- **TypeScript ESLint**: 8.46.4

## Development Setup

### Project Configuration

#### Vite Config (`vite.config.ts`)
- React plugin enabled
- Tailwind CSS plugin enabled
- Path alias: `@` → `./src`
- Allows importing with `@/` prefix

#### TypeScript Config
- `tsconfig.json`: Base configuration
- `tsconfig.app.json`: App-specific config
- `tsconfig.node.json`: Node-specific config

#### ESLint Config
- Modern flat config format (`eslint.config.js`)
- React hooks rules enabled
- TypeScript rules enabled

#### Components Config (`components.json`)
- shadcn/ui configuration
- Component aliases point to `@/core/components/shadcn`
- Utility aliases point to `@/core/lib/utils/shadcn`

### Environment Configuration

#### Environment Variables
- `VITE_API_URL`: Base URL for API requests
- Accessed via `import.meta.env.VITE_API_URL`
- Configured in `src/core/configs/env.ts`

#### Docker Environment
- Build arg: `VITE_API_URL` passed during build
- Default API URL: `http://172.93.163.153:50061/v1` (from docker-compose.yaml)

## Build & Deployment

### Build Process
1. TypeScript compilation: `tsc -b`
2. Vite build: `vite build`
3. Output: `dist/` directory

### Docker Setup
- **Multi-stage build**:
  1. Builder stage: Node 22 Alpine, installs dependencies, builds app
  2. Production stage: Nginx Alpine, serves static files
- **Nginx Configuration**: Custom `nginx.conf` for SPA routing
- **Port**: 80 exposed
- **Network**: External `docker_stack` network

### Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Dependencies Overview

### Runtime Dependencies
- React ecosystem (React, React DOM, React Router)
- UI libraries (Radix UI primitives, shadcn components)
- Form handling (React Hook Form, Zod)
- Utilities (clsx, tailwind-merge, class-variance-authority)

### Development Dependencies
- Build tools (Vite, TypeScript)
- Linting (ESLint, TypeScript ESLint)
- Type definitions (@types/react, @types/node)

## File Structure Patterns

### Import Aliases
- `@/` prefix for `src/` directory
- Example: `@/core/components/shadcn/button`
- Configured in `vite.config.ts` and `tsconfig.json`

### Path Resolution
- Absolute imports preferred over relative
- Features import from `@/core/` for shared utilities
- Features can import from each other

## Technical Constraints

### Browser Support
- Modern browsers (ES modules support required)
- No explicit polyfills configured

### API Integration
- RESTful API expected
- Custom response format with `statusCode`, `traceId`, etc.
- Bearer token authentication
- Base URL configurable via environment variable

### Storage
- Uses localStorage (browser-only)
- No server-side rendering (SSR) support
- No cookie-based authentication

### Build Output
- Static files only (SPA)
- Requires server configuration for client-side routing
- Nginx config handles SPA routing

## Development Workflow

### Adding New Features
1. Create feature folder in `src/features/`
2. Add components, hooks, types, views
3. Create `routes.ts` with feature routes
4. Import routes in `src/router.ts`
5. Routes automatically available

### Adding shadcn Components
1. Use shadcn CLI (if available) or manual copy
2. Place in `src/core/components/shadcn/`
3. Utilities in `src/core/lib/utils/shadcn/`
4. Import with `@/core/components/shadcn/` alias

### Environment Setup
1. Create `.env` file (not in repo)
2. Set `VITE_API_URL` variable
3. Restart dev server to pick up changes

## Known Technical Notes

### API Response Format
- Custom format with `statusCode` enum (ACCEPT, REJECT, PROCESSING, ERROR)
- Includes `traceId`, `reasonCode`, `reasonMessage`, `timeMs`
- HTTP client validates `statusCode` and throws on non-ACCEPT

### Token Storage
- Access token: `access_token` key
- Refresh token: `refresh_token` key
- Stored as JSON strings in localStorage
- Automatically included in Authorization header

### Product API
- Currently uses external FakeStore API (`https://fakestoreapi.com/products`)
- Not using the configured `VITE_API_URL`
- Should be migrated to use internal API client

