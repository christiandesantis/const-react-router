# Const React Router Template

A modern, production-ready template for building React applications using React Router with enhanced developer experience and additional tooling.

Built on top of the official React Router default template with carefully selected enhancements for faster development.

## Features

### Core Features
- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling

### Enhanced Features
- 🗂️ **Enhanced File-based Routing** - Custom nested directory routing with automatic layout inheritance
- 🧹 **Biome** - Fast, modern linter and formatter replacing ESLint + Prettier
- 🎭 **Lucide React** - Beautiful, customizable icon library
- ✅ **Zod** - Runtime type validation and schema parsing
- 🌍 **Environment Variables** - Type-safe environment variable handling with Zod validation
- 🎬 **TW Animate CSS** - Extended Tailwind animations and transitions
- 🛠️ **React Router DevTools** - Enhanced debugging for routing
- 🌙 **Dark Mode Hook** - Built-in dark mode state management
- 📱 **Mobile Detection Hook** - Responsive design utilities
- 🎨 **Shadcn/UI Compatible** - Ready for shadcn/ui component integration
- ⚡️ **React Compiler (RC)** - Includes React Compiler release candidate for automatic optimization

### Tech Stack
- **Package Manager**: `pnpm`
- **Language**: TypeScript
- **Framework**: React + React Router 7.6+
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4 + TW Animate CSS
- **Linting/Formatting**: Biome
- **Validation**: Zod
- **Icons**: Lucide React

📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

### Code Quality

This template uses Biome for linting and formatting:

```bash
# Check for issues
pnpm check

# Fix issues automatically
pnpm check --fix

# Format code
pnpm format

# Lint code
pnpm lint
```

## Building for Production

Create a production build:

```bash
pnpm build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Environment Variables

Environment variables are handled with type safety using Zod validation in `app/lib/env.ts`. Add your variables to `.env` and define their schema for runtime validation.

## React Compiler (Release Candidate)

This template includes the React Compiler release candidate (`babel-plugin-react-compiler: 19.1.0-rc.2`) which provides automatic optimization for React components. 

> ⚠️ **Note**: This is a release candidate version and may have stability issues. It's currently included as a development dependency but not actively configured.

### Removing React Compiler (Optional)

If you prefer not to use the React Compiler RC, you can remove it:

```bash
# Remove React Compiler dependencies
pnpm remove babel-plugin-react-compiler eslint-plugin-react-hooks
```

## Enhanced File-based Routing

This template extends React Router 7's default file-based routing with support for nested directory structures and automatic layout inheritance - a feature not supported by default in React Router 7.

### How It Works

The custom routing system (`app/routes.ts`) enables you to organize routes in nested directories while automatically inheriting layouts from parent routes:

**Layout Definition:**
- `_app.tsx` - Defines the main application layout
- `_auth.tsx` - Defines an authentication layout

**Nested Directory Routes:**
- `_app/index.tsx` → `/` (inherits `_app` layout)
- `_app/dashboard.tsx` → `/dashboard` (inherits `_app` layout)
- `_app/settings/index.tsx` → `/settings` (inherits `_app` layout)
- `_app/settings/profile.tsx` → `/settings/profile` (inherits `_app` layout)

**Key Benefits:**
- **Automatic Layout Inheritance** - Routes automatically inherit the layout from their parent directory prefix
- **Unlimited Nesting** - Support for deeply nested route structures
- **Clean Organization** - Group related routes in directories while maintaining flat URL structures
- **Type Safety** - Full TypeScript support with proper route typing

This enhancement allows for better code organization and more intuitive file structures compared to React Router 7's default flat routing approach.

## Hooks

### Dark Mode
```tsx
import useDark from "~/hooks/use-dark";

const { isDark, toggleDark } = useDark();
```

### Mobile Detection
```tsx
import { useIsMobile } from "~/hooks/use-mobile";

const isMobile = useIsMobile();
```

## Included Libraries & Utilities

### Type Validation
- **Zod** - Runtime type validation and schema parsing
- Type-safe environment variable handling

### Icons & UI
- **Lucide React** - 1000+ beautiful, customizable icons
- **Tailwind Merge** + **clsx** - Utility for merging Tailwind classes

### Development Tools
- **React Router DevTools** - Enhanced debugging for routing and data loading
- **Biome** - Fast, modern linter and formatter
- **TypeScript** - Full type safety throughout the application

## Styling

This template comes with [Tailwind CSS v4](https://tailwindcss.com/) and [TW Animate CSS](https://github.com/jamiebuilds/tw-animate-css) for enhanced animations already configured. The setup is compatible with [shadcn/ui](https://ui.shadcn.com/) components for rapid UI development.

## Technical Notes

### Development Experience Improvements
- **Clean Console**: Custom Vite middleware silently handles Chrome DevTools requests (e.g., `/.well-known/` URLs) to prevent console noise during development
- **CJS Warning Suppression**: Environment variable `VITE_CJS_IGNORE_WARNING=true` suppresses deprecated CJS API warnings from React Router dependencies

---

Built with ❤️ using React Router and enhanced by Constech.dev.
