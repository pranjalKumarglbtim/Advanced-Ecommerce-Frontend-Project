# Contributing Guide

## How to Contribute

We welcome contributions to the Advanced Ecommerce Frontend project! Please follow these guidelines to help us maintain a high-quality codebase.

## Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/Advanced-Ecommerce-Frontend-Project.git
   ```
3. Navigate to the project directory:
   ```bash
   cd Advanced-Ecommerce-Frontend-Project
   ```
4. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```
5. Set up environment variables:
   - Copy `.env.example` to `.env` (if exists)
   - Fill in required variables (see Environment Variables section below)

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/your-bugfix-name
   ```
2. Make your changes, following the code style guidelines
3. Run tests to ensure nothing is broken:
   ```bash
   pnpm test
   ```
4. Lint your code:
   ```bash
   pnpm lint
   ```
5. Format your code with Prettier:
   ```bash
   pnpm format
   ```
6. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add new feature"  # or fix:, docs:, etc.
   ```
7. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request against the `dev` branch of the original repository

## Code Style Guidelines

### TypeScript
- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use arrow functions for callbacks
- Avoid `any` type; use `unknown` when type is uncertain

### React
- Use functional components with hooks
- Keep components small and focused
- Use PropTypes or TypeScript for component props
- Memoize expensive computations with `useMemo` and `useCallback`
- Follow React Router v6 conventions for routing

### Styling
- Use CSS Modules or scoped CSS where appropriate
- Follow BEM naming convention for global CSS
- Use CSS custom properties for theme variables
- Avoid inline styles for anything beyond dynamic values

### Commit Messages
Follow Conventional Commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting, missing semicolons, etc.
- `refactor:` for code refactoring
- `test:` for adding or modifying tests
- `chore:` for build process or tooling changes

## Testing Guidelines

### Unit Tests
- Write tests for all new functions and components
- Use Jest and React Testing Library
- Place test files alongside the source files with `.test.tsx` suffix
- Aim for at least 80% code coverage
- Mock external dependencies (API calls, etc.)

### End-to-End Tests (if applicable)
- Use Cypress for E2E testing
- Keep E2E tests focused on user journeys
- Run E2E tests in CI on pull requests

## Pull Request Process

1. Ensure your branch is up to date with `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout your-branch
   git merge dev
   ```
2. Run the full test suite:
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```
3. Update the PR description with:
   - Summary of changes
   - Screenshots or GIFs if UI is affected
   - Steps to test the changes
   - Any relevant issue numbers
4. Request review from maintainers
5. Address any feedback promptly
6. Once approved, maintainers will merge your PR

## Reporting Issues

When reporting bugs or requesting features, please include:
- A clear and descriptive title
- Steps to reproduce the issue (for bugs)
- Expected vs actual behavior
- Screenshots or screen recordings if applicable
- Environment details (browser, OS, etc.)
- Any relevant logs or error messages

## Community Guidelines

- Be respectful and inclusive of all contributors
- Follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)
- Help others in issues and discussions
- Give credit where it's due

## Getting Help

If you need assistance:
- Check existing issues and discussions
- Ask questions in the project's discussion forum
- Reach out to maintainers directly (if contact info is provided)

Thank you for contributing to our project!