# System Architecture

## Core Principles
1. **Performance First**: SSR for faster initial load, code splitting for faster navigation
2. **Type Safety**: End-to-end TypeScript with Zod validation for API contracts
3. **Scalability**: Modular structure with clear separation of concerns
4. **Developer Experience**: HMR, linting, formatting, and comprehensive testing

## Tech Stack Deep Dive

### Frontend Layer
- **React 19**: With concurrent features and automatic batching
- **TypeScript 5**: Strict mode enabled with path aliases
- **Vite 5**: Fast dev server with ESBuild, optimized builds with Rollup
- **CSS Modules/Global CSS**: Scoped styling where needed

### Routing System
- **File-based Routing**: `src/routes/` directory maps to routes
- **Dynamic Route Generation**: `routeTree.gen.ts` scans routes folder at build time
- **Nested Layouts**: Supported through `__root.tsx` and route-specific layouts

### State Management
- **Client State**: React Context + useReducer for global state (cart, user, etc.)
- **Server State**: React Query (or similar) for data fetching/caching
- **URL State**: Sync with React Router for shareable links

### API Layer
- **Typed API Client**: Generated functions with Zod validation
- **Request/Response Interceptors**: Auth tokens, error handling, logging
- **Optimistic Updates**: For better UX on mutations

### Asset Management
- **Static Assets**: Images, fonts in `public/` served as-is
- **Imported Assets**: SVGs, icons imported via ES modules for tree-shaking
- **Image Optimization**: Next-gen formats, responsive srcset where applicable

## Data Flow Patterns

### Initial Load (SSR)
1. Request hits Node.js server (`src/server.ts`)
2. Server fetches initial data (if needed)
3. Renders React app to HTML string
4. Sends HTML + preloaded state to client
5. Client hydrates React without flash of content

### Client Navigation
1. React Router intercepts navigation
2. Matches route from pre-generated route tree
3. Lazy-loads route component + dependencies
4. Fetches data via React Query or useEffect
5. Updates URL and renders new UI

### API Request Flow
1. User action triggers API call
2. Request goes through interceptors (add auth, etc.)
3. Sent to backend via fetch/XHR
4. Response validated with Zod schema
5. Data cached or stored in state
6. UI updates automatically

## Security Considerations
- **XSS Prevention**: React auto-escapes, avoid dangerouslySetInnerHTML
- **CSRF Protection**: Same-site cookies, double-submit cookie pattern
- **Authentication**: JWT tokens in HTTP-only cookies
- **Rate Limiting**: Client-side debouncing + server-side limits
- **Input Validation**: Zod schemas on both client and server

## Performance Optimizations
- **Code Splitting**: Route-based splitting with dynamic imports
- **Bundle Analysis**: Rollup-plugin-visual for bundle insights
- **Lazy Loading**: Images, components, and non-critical dependencies
- **Caching Strategy**: Cache-Control headers, service workers (optional)
- **Bundle Size**: Tree-shaking, dead code elimination, minification

## Deployment Architecture
- **Build Output**: `dist/` contains static assets and SSR bundle
- **Static Hosting**: Netlify/Vercel serve `dist/client/` for SPA fallback
- **SSR Hosting**: Node.js server serves `dist/server/` for SSR routes
- **CDN Integration**: Assets served via CDN with proper cache headers
- **Environment Config**: Separate builds for dev/stage/prod