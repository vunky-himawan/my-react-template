# My React Vite Template with TanStack Query, React Router, shadcn/ui, Husky and following Feature-Sliced Design

This is a modern React template project built with Vite, _featuring Progressive Web App (PWA) support_ (need attention), TanStack Query (React Query), React Router, shadcn/ui, Husky and following [Feature-Sliced Design](https://feature-sliced.github.io/documentation/) for a scalable and developer-friendly front-end setup.

## Features

- Vite: Fast build tool for an optimized development experience.

- Progressive Web App (PWA): Offline support, app-like installation, and service worker integration.

- TanStack Query: Efficient API data fetching and state management.

- React Router: Declarative routing for seamless navigation.

- shadcn/ui: Customizable, accessible UI components for rapid development.

- TypeScript: Type-safe code for improved maintainability.

- Tailwind CSS: Utility-first CSS framework for quick UI styling.

- ESLint & _Prettier (will be implemented)_: Ensure code quality and consistent formatting.

- Husky: Git hooks for automated linting and formatting before commits.

- Zod: Schema validation for forms (e.g., login form validation).

## Prerequisites

Ensure you have the following installed:

- Node.js (version 18 or higher)

- Corepack (recommended, or use npm/yarn)

## Project Structure

```
├── Dockerfile
├── public
├── src
│   ├── app
│   │   ├── providers
│   │   │   ├── query-client.provider.tsx
│   │   │   └── sidebar.provider.tsx
│   │   ├── routes
│   │   │   ├── index.tsx
│   │   │   ├── (authenticated)
│   │   │   │   └── route.tsx
│   │   │   ├── (public)
│   │   │   │   └── auth
│   │   │   │       ├── login
│   │   │   │       │   └── index.tsx
│   │   │   │       └── route.tsx
│   │   │   └── __root.tsx
│   │   └── routeTree.gen.ts
│   ├── config
│   │   └── env.ts
│   ├── entities
│   │   └── user
│   │       ├── api
│   │       ├── model
│   │       └── ui
│   │   └── (entities)
│   ├── features
│   │   └── auth
│   │       └── sign-in
│   │           ├── api
│   │           ├── model
│   │           │   └── sign-in-schema.ts
│   │           └── ui
│   │               └── sign-in-form.tsx
│   │   └── (features)
│   ├── main.tsx
│   ├── pages
│   │   └── auth
│   │       └── sign-in
│   │           └── index.tsx
│   │   └── (pages)
│   │       └── index.tsx
│   ├── shared
│   │   ├── api
│   │   │   └── client.ts
│   │   ├── helpers
│   │   ├── hooks
│   │   │   ├── use-form-field.tsx
│   │   │   ├── use-mobile.ts
│   │   │   └── use-sidebar.tsx
│   │   ├── layouts
│   │   │   ├── guest.layout.tsx
│   │   │   ├── main.layout.tsx
│   │   │   └── ....
│   │   ├── lib
│   │   │   ├── axios
│   │   │   │   └── index.ts
│   │   │   ├── tanstack-query
│   │   │   │   └── client.ts
│   │   │   ├── tanstack-router
│   │   │   │   └── router.ts
│   │   │   └── utils.ts
│   │   ├── ui
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── ....
│   │   └── utils
│   │       └── url.tsx
│   └── widgets
│       └── auth
│           └── auth-form.tsx
```

#### Key Configurations

- `entities`: Represents main domain objects, e.g., user. Usually contains api, model, and UI specific to the domain.

- `features`: Reusable application functionalities, e.g., sign-in. Can consume entities or widgets.

- `pages`: Page-level components mapped to URLs. Can use features and widgets.

- `widgets`: Small UI components that are composable and reusable across features or pages.

- `shared`: Everything reusable app-wide: helpers, hooks, layouts, libraries, and common UI components.

### Vite PWA

PWA support is enabled via `vite-plugin-pwa`. The service worker is configured in vite.config.ts.

### TanStack Query

TanStack Query is set up in `src/lib/tanstack/client.ts`. The `QueryClientProvider` in `src/lib/tanstack/client-provider.tsx` wraps the app to enable data fetching with hooks like `useQuery` and `useMutation`.

### TanStack Router

Routing is configured in `src/lib/tanstack/router.ts` and `src/routes`. Public routes (e.g., login) are in `src/routes/(public)/auth`, while protected routes are in `src/routes/(authenticated)`. The `routeTree.gen.ts` file suggests the use of TanStack Router for type-safe routing.

### shadcn/ui

Pre-installed shadcn/ui components are in src/components/ui. Customize component styles easily using [TweakCN](https://tweakcn.com/), a tool for generating and applying shadcn/ui styles. To add new components, run:

```
pnpm dlx shadcn@latest add <component-name>
```

### Tailwind CSS

Tailwind CSS is configured in tailwind.config.js. Global styles are in `src/index.css`.

### Form Validation

Login form validation is handled in `src/routes/(public)/auth/login/-validation/login.validation.ts`, likely using Zod for schema validation.

### Husky

Husky manages Git hooks to ensure code is linted and formatted before commits. Configuration is in the .husky folder.

### Feature-Sliced Design

FSD is a front-end architecture pattern that divides the application into layers and slices:

- `app`: App entry point, global providers, and routing configuration.

- `pages`: URL mapped pages, can compose features and widgets.

- `features`: Reusable functionalities, focused on user flows or specific use cases.

- `entities`: Domain-level objects (e.g., User, Project). Contains model, API, and domain-specific UI.

- `widgets`: Small composable UI components for cross-feature usage.

- `shared`: App-wide reusable resources: helpers, hooks, layouts, and UI components.

FSD helps with scalability, clear reusability, and controlled dependencies between slices.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ziraaa/react-shadcn-pwa-template.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

Open http://localhost:5173 in your browser to view the app.

4. Build for production:

```bash
pnpm build
```

Production files are generated in the dist folder.

5. Preview the production build:

```bash
pnpm preview
```

### Scripts

- `pnpm dev`: Start the development server.

- `pnpm build`: Build the app for production.

- `pnpm preview`: Preview the production build.

- `pnpm routes:generate`: Generate route files using TanStack Router.

- `pnpm prepare`: Run Husky hooks.

- `pnpm lint`: Run ESLint to check code quality.
