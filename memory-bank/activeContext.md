# Active Context

## Current Work Focus
The project is a **feature-based React boilerplate** that demonstrates modern React development patterns. It's currently in a functional state with authentication, product listing, and welcome pages implemented.

## Recent Changes
Based on codebase analysis:
- Feature-based architecture implemented with Auth, Product, and Welcome features
- Authentication system with sign in, sign up, and sign out
- Product listing using external FakeStore API
- shadcn/ui components integrated
- Docker deployment configuration set up
- TypeScript types defined for all features
- **User Management enhancement**: Added user detail view (view/edit modes) and delete user functionality in management view.
- **Hook Stabilization**: Updated `useUsers` to use `useCallback` and `useMemo` for stable references, preventing unnecessary re-renders.

## Next Steps & Considerations

### Code Quality Improvements
1. **Consolidate useAuth hooks**: There are two `useAuth` hooks:
   - `src/features/Auth/hooks/useAuth.ts` (signIn, signUp)
   - `src/features/Wellcome/hooks/useAuth.tsx` (signOut)
   - **Action**: Merge into single hook in Auth feature, import in Welcome

2. **Fix typo**: `ProducsRoute` should be `ProductsRoute` in router.ts
   - **Action**: Rename export and import

3. **Product API integration**: Currently uses external FakeStore API directly
   - **Action**: Migrate to use internal `httpRequest` utility with `VITE_API_URL`

4. **Error handling**: Consider global error boundary for better error handling
   - **Action**: Add React Error Boundary component

### Feature Enhancements
1. **Protected routes**: Add route guards for authenticated pages
   - **Action**: Create auth context/provider, protect `/products` route

2. **Token refresh**: Implement refresh token logic
   - **Action**: Add token refresh interceptor in HTTP client

3. **Loading states**: Improve loading indicators
   - **Action**: Add skeleton loaders or spinners

4. **Form improvements**: Add password strength indicator, email format hints
   - **Action**: Enhance SignUpView with better UX

### Architecture Improvements
1. **Context API**: Consider adding auth context for global auth state
   - **Action**: Create `AuthContext` in `src/features/Auth/contexts/`

2. **API service layer**: Abstract API calls into service classes
   - **Action**: Create service layer between hooks and HTTP client

3. **Constants organization**: Consider feature-specific constants
   - **Action**: Move feature constants to feature folders

## Active Decisions

### Architecture Decisions
- ✅ **Feature-based structure**: Maintained and working well
- ✅ **shadcn/ui**: Chosen for component library, well integrated
- ✅ **React Hook Form + Zod**: Working well for form validation
- ⚠️ **State management**: Currently local state only, may need global state later

### Technical Decisions
- ✅ **Vite**: Fast build tool, good DX
- ✅ **TypeScript**: Full type safety maintained
- ✅ **Tailwind CSS**: Utility-first styling working well
- ✅ **Docker**: Multi-stage build for production deployment

## Important Patterns & Preferences

### Code Organization
- **Feature-first**: All feature code in feature folders
- **Shared utilities**: Core utilities in `core/lib/utils/`
- **Type definitions**: Types close to usage (in feature folders)
- **Route aggregation**: Central router combines feature routes

### Naming Conventions
- **Components**: PascalCase (e.g., `ProductView`, `SignInView`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth`, `useProducts`)
- **Types**: PascalCase with descriptive names (e.g., `ProductModel`, `SignInRequest`)
- **Files**: Match component/hook names (e.g., `ProductView.tsx`, `useAuth.ts`)

### Import Patterns
- **Absolute imports**: Use `@/` prefix for all imports
- **Feature imports**: Import from `@/features/FeatureName/`
- **Core imports**: Import from `@/core/`
- **External**: Standard npm package imports

### Styling Preferences
- **Tailwind utilities**: Prefer utility classes over custom CSS
- **Dark theme**: Current UI uses dark theme
- **Responsive**: Use Tailwind responsive classes
- **Component variants**: Use class-variance-authority for variants

## Learnings & Project Insights

### What Works Well
1. Feature-based structure makes code easy to find and modify
2. TypeScript catches errors early
3. shadcn/ui provides good component foundation
4. React Hook Form + Zod provides excellent form validation
5. Docker setup enables easy deployment

### Challenges Encountered
1. Duplicate hooks need consolidation
2. External API usage should be abstracted
3. No route protection currently implemented
4. Token refresh logic not implemented

### Best Practices Observed
1. Type definitions close to usage improves maintainability
2. Custom hooks encapsulate business logic well
3. Centralized HTTP client simplifies API calls
4. Storage utility provides type-safe localStorage access

## Current State Summary
- ✅ **Working**: Authentication flow, product listing, routing, forms
- ⚠️ **Needs attention**: Hook consolidation, API abstraction, route protection
- 📋 **Future**: Error boundaries, token refresh, improved UX

## Development Notes
- Project uses React 19 (latest version)
- All routes use `FullLayout` for consistent header
- Forms use dark theme with gray color scheme
- Products displayed in 4-column grid (responsive)
- GitHub sign-in button present but not implemented

