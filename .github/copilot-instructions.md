# Tech Stack
- **Package Manager**: `pnpm`
- **Language**: TypeScript
- **Framework**: React + React Router 7.6.2+
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Linting/Formatting**: Biome
- **Testing**: Vitest
- **Validation**: Zod

# Code Style
- Use arrow functions (`const fn = () => {}`)
- Use `const` over `let/var`
- Use `===`/`!==` for comparisons
- Use `async/await` over `.then()`
- Use `~/` imports instead of relative paths
- Avoid `any` type when possible
- Format with: `pnpm check --fix`

# React Patterns
- Components as `const` with arrow functions
- Props as `interface` (when >3 props) or inline
- No `React.FC`, place type at end: `(props: Props) => {}`

# File-based Routing
File-based routing with automatic layout inheritance:

**Flat Structure:**
- `routes/_app.page.tsx` → `/page` (inherits `_app` layout)
- `routes/_auth.login.tsx` → `/login` (inherits `_auth` layout)

**Nested Structure:**
- `routes/_app.section/index.tsx` → `/section`
- `routes/_app.section/page.tsx` → `/section/page`
- `routes/_app.section/sub/index.tsx` → `/section/sub`

Routes automatically inherit parent layout based on prefix (`_app`, `_auth`, etc.).

# Types & Validation
- Use `interface` for object shapes, `type` for unions
- Use `zod` for validation schemas
- Prefer `Record<string, unknown>` over generic objects
- Use utility types: `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`