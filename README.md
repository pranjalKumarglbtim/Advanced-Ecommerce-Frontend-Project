# Advanced Ecommerce Frontend – Comprehensive README

## 1. Project Overview
This repository contains a **React + TypeScript** frontend for an ecommerce platform, built with **Vite** for fast development and optimized production bundles. It supports **Server‑Side Rendering (SSR)** for initial page load performance, a **typed API client**, custom **React hooks**, and a **dynamic routing** system generated at build time.

## 2. Table of Contents
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Installation & Setup](#installation--setup)  
5. [Folder Structure](#folder-structure)  
6. [Development Workflow](#development-workflow)  
   - 6.1 [Running the Dev Server](#running-the-dev-server)  
   - 6.2 [Building for Production](#building-for-production)  
   - 6.3 [Previewing a Production Build](#previewing-a-production-build)  
7. [Testing](#testing)  
8. [Linting & Formatting](#linting--formatting)  
9. [Environment Variables](#environment-variables)  
10. [Scripts Reference (package.json)](#scripts-reference)  
11. [Git Workflow & Branching Model](#git-workflow--branching-model)  
12. [CI/CD (GitHub Actions) Overview](#cicd-github-actions)  
13. [Contribution Guidelines](#contribution-guidelines)  
14. [Troubleshooting](#troubleshooting)  
15. [License](#license)  

## 3. Features
| ✅ | Description |
|---|-------------|
| **SSR** | `src/server.ts` renders the initial HTML on the server, reducing Time‑to‑First‑Byte. |
| **Dynamic Route Generation** | `src/routeTree.gen.ts` walks `src/routes/**/*.tsx` and builds a type‑safe route tree used by `src/router.tsx`. |
| **Typed API Client** | `src/lib/api/*.ts` contains functions generated with Zod schemas for request validation and response typing. |
| **Global Error Handling** | Centralised error capture (`src/lib/error-capture.ts`) and user‑friendly error pages (`src/lib/error-page.ts`). |
| **Responsive Design** | Custom hook `src/hooks/use-mobile.tsx` toggles mobile‑specific UI logic. |
| **Asset Management** | All static assets live in `public/` (served as‑is) and `src/assets/` (imported via ES modules). |
| **State Management** | Simple global state via React Context + `useReducer`; no external store unless added later. |
| **Testing** | Jest + React Testing Library with TypeScript support. |
| **Linting/Formatting** | ESLint (with recommended React/TS rules) and Prettier for consistent code style. |
| **Docker Ready** | `Dockerfile` (generated on‑demand) can build the app for containerised deployments. |

## 4. Tech Stack
| Layer | Tool | Version (as of repository) |
|-------|------|-----------------------------|
| **Bundler** | Vite | 5.x |
| **Framework** | React | 19.x |
| **Language** | TypeScript | 5.x |
| **Routing** | Vite Router 2 | 2.x |
| **Styling** | CSS (global) + optional PostCSS | — |
| **Package Manager** | pnpm (fallback npm) | 9.x |
| **Testing** | Jest, React Testing Library | — |
| **Lint/Format** | ESLint, Prettier | — |
| **Node Runtime** | Node.js | >=20.x |
| **Git Hooks** | Husky (optional) | — |

## 5. Prerequisites
1. **Node.js** – download from <https://nodejs.org/> (LTS 20+).  
2. **pnpm** – install globally: `npm i -g pnpm`.  
3. **Git** – required for version control.  
4. (Optional) **Docker** – for container builds.  

> **Note**: All commands below assume PowerShell on Windows; adjust for Bash/macOS as needed.

## 6. Installation & Setup
```powershell
# 1️⃣ Clone the repository
git clone <repo-url>
cd "E:\Main Virtual Intern\Advanced Ecommerce Frontend Project"

# 2️⃣ Install dependencies (pnpm will generate a lockfile)
pnpm install

# 3️⃣ Verify install
pnpm list      # shows installed packages
```
If you prefer npm:
```powershell
npm ci
```

## 6. Folder Structure (expanded)

```
E:\
└─ Main Virtual Intern\
   └─ Advanced Ecommerce Frontend Project
      ├─ .git/                     # Git metadata
      ├─ .kilo/                    # Kilo config (commands, agents)
      ├─ .prettier*                # Prettier configuration
      ├─ .eslint*                  # ESLint configuration
      ├─ .lovable\project.json     # Lovable project metadata
      ├─ bunfig.toml               # Bun configuration (optional)
      ├─ components.json           # Component metadata (Storybook/Docs)
      ├─ package.json & lockfiles
      ├─ vite.config.ts            # Vite build/dev config
      ├─ tsconfig.json             # TypeScript compiler options
      ├─ src\
      │  ├─ assets\                # Imported images, svgs, fonts
      │  ├─ components\            # Reusable UI components
      │  ├─ hooks\                 # Custom React hooks (e.g., use-mobile)
      │  ├─ lib\                   # Core utilities, API client, error handling
      │  │   ├─ api\               # Example functions for backend calls
      │  │   ├─ error-capture.ts   # Global error interceptor
      │  │   ├─ error-page.ts      # Friendly UI error page
      │  │   ├─ config.server.ts   # Server‑side runtime config
      │  │   └─ utils.ts           # Misc helper functions
      │  ├─ routes\                # File‑based route definitions (tsx)
      │  │   ├─ __root.tsx         # Root layout component
      │  │   └─ index.tsx          # Home page route
      │  ├─ routeTree.gen.ts       # Auto‑generated route tree (TS)
      │  ├─ router.tsx             # Router component wiring the tree
      │  ├─ server.ts              # SSR entry point (Node.js)
      │  ├─ start.ts               # Vite dev server starter
      │  └─ styles.css             # Global CSS
      ├─ public\                  # Static assets served as‑is
      │   ├─ index.html            # HTML template for Vite
      │   └─ img\*.jpeg            # Product images, etc.
      └─ test\ (optional)          # Test files if present
```

## 7. Development Workflow

### 7.1 Running the Dev Server
```powershell
pnpm dev
```
- Starts Vite’s development server on **http://localhost:5173** (default).  
- Hot Module Replacement (HMR) updates UI instantly on file changes.  
- Console output shows build progress and any TypeScript errors.

### 7.2 Building for Production
```powershell
pnpm build
```
- Generates an optimized, minified bundle under `dist/`.  
- SSR assets are compiled to `dist/server/`.  
- Build logs include asset size breakdown and any warnings.

### 7.3 Previewing a Production Build
```powershell
pnpm preview
```
- Serves `dist/` using Vite’s preview server (`http://localhost:4173`).  
- Useful for QA before deploying to a CDN or hosting platform.

## 8. Testing

### Unit / Component Tests
```powershell
pnpm test               # Run all tests once
pnpm test --watch       # Watch mode for TDD
```
- Tests are located alongside source files (`*.test.tsx`) or under `test/`.  
- Coverage report is saved to `coverage/`.

### End‑to‑End (optional)
If Cypress is added:
```powershell
pnpm cy:open            # Open Cypress UI
pnpm cy:run             # Headless run
```

## 9. Linting & Formatting

```powershell
pnpm lint               # Run ESLint (fixable warnings are auto‑fixed)
pnpm format             # Run Prettier on the whole codebase
```

Configuration files:
- `.eslintrc.js` – rule set, React/TS plugins.  
- `.prettierrc` – line width 120, single‑quote, trailing commas.

## 10. Environment Variables
Create a `.env` in the project root (never commit). Vite automatically prefixes variables with `VITE_` to expose them to the client.

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_BASE_URL` | Base URL for all backend API calls | `https://api.example.com` |
| `VITE_ENABLE_LOCALE` | Default locale for i18n | `en-US` |
| `VITE_FEATURE_X` | Feature flag toggles (boolean) | `true` |

The server (`src/server.ts`) reads `process.env` directly for Node‑only secrets (e.g., DB connection strings) – keep those in a separate `.env.server` not shipped to the client.

## 11. Scripts Reference (package.json)

```json
{
  "scripts": {
    "dev": "vite",                        // dev server with HMR
    "build": "vite build",                // production bundle
    "preview": "vite preview",            // serve dist locally
    "test": "jest",                       // unit tests
    "test:watch": "jest --watch",         // watch mode
    "lint": "eslint . --ext .ts,.tsx",    // lint all source files
    "format": "prettier --write .",       # format whole repo
    "typecheck": "tsc --noEmit",          // TypeScript compile check
    "start": "node src/start.ts"          // optional Node start script
  }
}
```

Run any script with `pnpm run <script>` (or `npm run`).

## 12. Git Workflow & Branching Model
| Branch | Purpose |
|--------|---------|
| `main` | Production‑ready code (protected). |
| `dev`  | Integration branch; PRs are merged here before release. |
| `feature/<name>` | Individual feature development. |
| `bugfix/<name>` | Bug fixes targeting the current release. |
| `release/vX.Y.Z` | Release preparation; version bump and changelog. |

**Typical flow:**
```powershell
git checkout dev
git pull
git checkout -b feature/add-to-cart
# work, commit, push
git push -u origin feature/add-to-cart
# open PR -> target: dev
```

## 13. CI/CD (GitHub Actions) Overview
The repository includes a basic workflow (`.github/workflows/ci.yml`) that runs on every push/PR:

1. **Setup** – checkout code, install pnpm, node.  
2. **Cache** – pnpm store caching for faster installs.  
3. **Install** – `pnpm install --frozen-lockfile`.  
4. **Lint** – `pnpm lint`.  
5. **Typecheck** – `pnpm typecheck`.  
6. **Test** – `pnpm test --ci --coverage`.  
7. **Build** – `pnpm build`.  
8. **Artifact** – Upload `dist/` as build artifact (optional deployment steps).  

All jobs fail fast on first error, ensuring only passing code lands on `main`.

## 14. Contribution Guidelines
1. **Fork** the repository.  
2. **Create a branch** using the naming convention above.  
3. **Run lint & tests locally** before committing.  
4. **Write unit tests** for any new logic (≥80% coverage).  
5. **Commit messages** – follow Conventional Commits (`feat:`, `fix:`, `docs:`).  
6. **Open a Pull Request** targeting `dev`.  
7. **PR Description** – include:
   - Summary of changes
   - Screenshots (if UI affected)
   - Testing steps
   - Any required migrations or config updates

Reviewers will run the CI pipeline; once all checks pass and approvals are received, the PR can be merged.

## 15. Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `vite dev` crashes with “port already in use” | Another process on 5173 | `pnpm dev --port 5174` or kill the other process (`netstat -ano | findstr :5173` then `taskkill /PID <pid> /F`). |
| TypeScript error “Cannot find module ‘…/utils’” | Missing file or path alias not resolved | Ensure `paths` in `tsconfig.json` matches folder structure, then run `pnpm typecheck`. |
| Images not loading in production | Images placed in `src/assets` but not imported | Move static images to `public/` or import them so Vite includes them in the bundle. |
| Tests failing after a refactor | Mocked module path changed | Update the mock path in the test file. |
| Lint errors on double quotes | Prettier config enforces single quotes | Run `pnpm format` to auto‑fix. |

If an issue persists, search the repo with `grep` or open an issue.

## 16. License
This project is licensed under the **MIT License**. See the `LICENSE` file for full terms.

*Generated on 2026‑06‑14.*  
For any questions, refer to the project’s `README.md` or open an issue in the repository.