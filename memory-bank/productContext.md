# Product Context

## Why This Project Exists
This project serves as a **training and reference implementation** of feature-based architecture in React. It demonstrates best practices for organizing large-scale React applications and provides a starting point for new projects.

## Problems It Solves
1. **Code Organization**: Provides a clear structure for organizing React code that scales with application growth
2. **Feature Isolation**: Each feature is self-contained, making it easier to understand, test, and maintain
3. **Developer Onboarding**: New developers can quickly understand the codebase structure
4. **Reusability**: Core utilities and components are centralized for reuse across features
5. **Type Safety**: Full TypeScript implementation prevents common runtime errors

## How It Should Work

### User Flow
1. **Welcome Page** (`/`): Landing page with navigation links to products, sign in, and sign up
2. **Authentication**:
   - Sign Up (`/signup`): Create new account with email, password, name, and optional phone
   - Sign In (`/signin`): Authenticate with email and password, stores tokens in localStorage
   - Sign Out: Clears tokens and redirects to sign in
3. **Products** (`/products`): Display list of products fetched from external API

### Key Interactions
- **Form Validation**: All forms use Zod schemas for validation with React Hook Form
- **Token Management**: Access and refresh tokens stored in localStorage, automatically included in API requests
- **Navigation**: React Router handles client-side routing with nested routes
- **Error Handling**: API errors are caught and displayed to users

## User Experience Goals
- **Clean UI**: Dark-themed, modern interface using shadcn/ui components
- **Responsive Design**: Works on different screen sizes (grid layout for products)
- **Loading States**: Visual feedback during async operations (loading buttons, error messages)
- **Intuitive Navigation**: Clear links and buttons for moving between pages
- **Form Feedback**: Real-time validation messages and error display

## Design Philosophy
- **Feature-First**: Features are the primary organizational unit
- **Separation of Concerns**: Each feature contains everything it needs (components, hooks, types, views, routes)
- **Shared Core**: Common utilities, layouts, and components live in `core/`
- **Type Safety**: TypeScript types defined close to where they're used
- **Modern React**: Uses React 19 features, hooks, and functional components

## Current Implementation Status
- ✅ Welcome page with navigation
- ✅ Authentication (sign in, sign up, sign out)
- ✅ Product listing with external API
- ✅ Form validation and error handling
- ✅ Token-based authentication
- ✅ Responsive UI components
- ⚠️ Note: There's a duplicate `useAuth` hook in Wellcome feature (should be consolidated)

