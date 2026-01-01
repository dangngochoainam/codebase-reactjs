# System Patterns

## Architecture Overview
The application follows a **feature-based architecture** where each feature is a self-contained module with its own components, hooks, types, views, and routing configuration.

## Key Architectural Decisions

### 1. Feature-Based Organization
Each feature (`Auth`, `Product`, `Wellcome`) is organized as:
```
FeatureName/
├── components/     # Feature-specific components
├── hooks/         # Feature-specific hooks
├── types/         # Feature-specific TypeScript types
├── views/         # Page-level components
└── routes.ts      # Feature routing configuration
```

**Rationale**: Features are the primary organizational unit, making it easy to locate and modify related code.

### 2. Central Route Aggregation
All feature routes are imported and combined in `src/router.ts`:
```typescript
export const appRoutes = [...WelcomeRoutes, ...ProducsRoute, ...AuthRoutes];
```

**Pattern**: Each feature exports its routes, central router combines them.

### 3. Layout System
- `FullLayout`: Wraps routes with Header and Outlet for nested routing
- All routes use `FullLayout` as parent component
- Header is shared across all pages

**Pattern**: Layout components wrap route trees, providing consistent structure.

### 4. HTTP Client Pattern
- Centralized HTTP utility in `core/lib/utils/http.ts`
- Automatically includes Authorization header from localStorage
- Standardized response format with `BaseHttpResponse`
- Status code enum for consistent error handling

**Pattern**: Single HTTP client with automatic token injection.

### 5. Storage Utility Pattern
- Wrapper class around localStorage with type-safe getters/setters
- JSON serialization/deserialization handled automatically
- Centralized storage keys in constants

**Pattern**: Abstraction over browser storage with type safety.

## Component Patterns

### Form Handling
- **React Hook Form** for form state management
- **Zod** for schema validation
- **@hookform/resolvers** to connect them
- Form components from shadcn/ui

**Example Pattern**:
```typescript
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { ... }
});
```

### Custom Hooks Pattern
- Feature-specific hooks encapsulate business logic
- Hooks return functions and state needed by components
- Example: `useAuth()` returns `{ signIn, signUp }` or `{ signOut }`

**Note**: There's currently a duplicate `useAuth` hook in Wellcome feature that should be consolidated.

### View Components
- Views are page-level components that compose feature components
- Views handle navigation and high-level state
- Views use hooks for data fetching and business logic

## Routing Patterns

### Nested Routes
All routes use nested structure with `FullLayout`:
```typescript
{
  path: "/products",
  Component: FullLayout,
  children: [
    { path: "", Component: ProductView }
  ]
}
```

### Route Definition
- Each feature defines routes in `routes.ts`
- Routes use `RouteObject` type from react-router
- Routes are exported and aggregated centrally

## State Management Patterns

### Local State
- `useState` for component-level state
- `useEffect` for side effects (data fetching)

### Token Management
- Tokens stored in localStorage via `Storage` utility
- Tokens automatically included in HTTP requests
- Tokens cleared on sign out

### No Global State
- Currently no global state management library (Redux, Zustand, etc.)
- State is managed at component/hook level
- Could be extended with context API or state library if needed

## Error Handling Patterns

### API Errors
- HTTP client throws errors for non-ACCEPT status codes
- Components catch errors and display user-friendly messages
- Error state managed in component (not global)

### Form Validation
- Zod schemas define validation rules
- React Hook Form displays validation errors
- Custom error messages for better UX

## Type Safety Patterns

### Type Definitions
- Types defined close to where they're used (in feature `types/` folders)
- Shared types in `core/` if needed
- Interfaces for API requests/responses

### Type Inference
- Zod schemas infer TypeScript types
- `z.infer<typeof schema>` pattern used

## UI Component Patterns

### shadcn/ui Integration
- Components in `core/components/shadcn/`
- Utility functions in `core/lib/utils/shadcn/`
- Tailwind CSS for styling
- Component variants using `class-variance-authority`

### Styling Approach
- Tailwind CSS utility classes
- Dark theme with custom color scheme
- Responsive design with Tailwind breakpoints
- Custom component styling via className props

## Critical Implementation Paths

### Authentication Flow
1. User submits sign in form
2. `useAuth().signIn()` called
3. HTTP request to `auth/signin` endpoint
4. Tokens stored in localStorage
5. Navigate to `/products`

### Product Display Flow
1. `ProductView` renders `ProductList`
2. `ProductList` uses `useProducts()` hook
3. Hook fetches from external API
4. Products displayed in grid layout
5. Each product rendered as `ProductItem`

### Route Resolution
1. `main.tsx` renders `BrowserRouter` with `AppRouter`
2. `AppRouter` uses `useRoutes()` with combined routes
3. React Router matches URL to route
4. Layout component renders with nested view

