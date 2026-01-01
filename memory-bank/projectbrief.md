# Project Brief

## Overview
A scalable React + Vite + TypeScript boilerplate following **feature-based architecture**. This project provides a clean, modular structure to help build large React applications that are easy to maintain, test, and grow over time.

## Core Goals
- Demonstrate feature-based architecture patterns
- Provide a production-ready boilerplate for React applications
- Showcase modern React development practices with TypeScript
- Include authentication, routing, and UI component examples
- Support Docker deployment for production environments

## Project Scope
- **Frontend Application**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.2
- **Routing**: React Router 7.11
- **UI Framework**: Tailwind CSS 4.1 with shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React hooks (local state, custom hooks)
- **Deployment**: Docker with Nginx

## Key Features
1. **Feature-Based Architecture**: Each feature (Auth, Product, Welcome) is self-contained with its own components, hooks, types, views, and routes
2. **Authentication System**: Sign in, sign up, and sign out functionality with token management
3. **Product Display**: Product listing and item display using external API (FakeStore API)
4. **Modern UI**: Dark-themed UI using shadcn/ui components with Tailwind CSS
5. **Type Safety**: Full TypeScript implementation with proper type definitions
6. **HTTP Client**: Custom HTTP utility with authentication token handling
7. **Storage Utility**: LocalStorage wrapper for token management

## Project Structure
```
src/
├── core/                # Global configuration, assets, styles, utilities
│   ├── assets/         # CSS and static assets
│   ├── css/
│   ├── components/    # Shared UI components (shadcn)
│   ├── configs/        # Environment configuration
│   ├── constants/      # App-wide constants
│   ├── layouts/        # App-wide layouts (Header, FullLayout)
│   └── lib/            # Utilities (http, storage)
├── features/           # Feature-based modules
│   ├── Auth/          # Authentication feature
│   ├── Product/       # Product listing feature
│   └── Wellcome/      # Welcome/home feature
├── router.ts          # Central route aggregation
└── main.tsx           # App entry point
```

## Target Audience
- Developers learning feature-based architecture
- Teams starting new React projects
- Developers looking for a production-ready boilerplate

## Success Criteria
- Clean, maintainable code structure
- Easy to extend with new features
- Type-safe implementation
- Production-ready deployment setup
- Good developer experience

