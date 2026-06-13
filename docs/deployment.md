# Deployment Guide

## Overview
This guide covers deployment strategies for the Advanced Ecommerce Frontend application. The app supports multiple deployment targets including static site hosts, Node.js servers, and containerized environments.

## Prerequisites
- Node.js >=20.x
- pnpm >=9.x (or npm/yarn)
- Git
- Access to deployment platform (Netlify, Vercel, AWS, etc.)

## Build Process
The application uses Vite for building:
```bash
# Install dependencies
pnpm install

# Create production build
pnpm build

# Output structure:
# dist/
#   ├─ client/     # Static assets (HTML, CSS, JS)
#   └─ server/     # SSR bundle (if applicable)
```

## Deployment Options

### 1. Static Site Hosting (Netlify/Vercel)
Best for SSR-enabled apps or SPA fallback.

**Netlify Configuration:**
- Build Command: `pnpm build`
- Publish Directory: `dist/client`
- Environment Variables:
  - `VITE_API_BASE_URL`
  - `NODE_ENV=production`

**Vercel Configuration:**
- Framework: Vite
- Build Command: `pnpm build`
- Output Directory: `dist/client`
- Install Command: `pnpm install`

### 2. Node.js Server Deployment
For full SSR capabilities.

**Steps:**
1. Transfer build artifacts to server:
   ```bash
   scp -r dist/ user@server:/app/
   scp package.json pnpm-lock.yaml user@server:/app/
   ```
2. Install production dependencies:
   ```bash
   cd /app
   pnpm install --prod
   ```
3. Set environment variables:
   ```bash
   export NODE_ENV=production
   export VITE_API_BASE_URL="https://api.yourdomain.com"
   # Add any server-only secrets
   ```
4. Start the server:
   ```bash
   node dist/server/index.js
   ```

**Process Management (PM2):**
```bash
pm2 start dist/server/index.js --name "ecommerce-frontend"
pm2 save
pm2 startup
```

### 3. Docker Deployment
Containerize for consistent environments.

**Dockerfile:**
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm i -g pnpm
COPY . .
RUN pnpm install
RUN pnpm build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm i -g pnpm
RUN pnpm install --prod
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server/index.js"]
```

**Build and Run:**
```bash
docker build -t ecommerce-frontend .
docker run -p 3000:3000 \
  -e VITE_API_BASE_URL="https://api.yourdomain.com" \
  ecommerce-frontend
```

### 4. CI/CD Deployment (GitHub Actions)
Example workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: ./dist/client
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
          enable-pull-request-preview: true
```

## Environment Variables

### Build-time Variables (Vite)
Prefix with `VITE_` to expose to client:
- `VITE_API_BASE_URL`: Backend API URL
- `VITE_ENABLE_LOCALE`: Default locale (e.g., `en-US`)
- `VITE_FEATURE_FLAG_X`: Boolean feature flags

### Runtime Variables (Node.js)
Available only to server:
- `NODE_ENV`: `development` | `production` | `test`
- `PORT`: Server port (default: 3000)
- `SESSION_SECRET`: For cookie signing
- `DATABASE_URL`: If using server-side DB
- `API_KEY`: Third-party service keys

**Note:** Never commit `.env` files. Use platform-specific secret management.

## Health Checks & Monitoring

### Health Endpoint
Add to `src/server.ts`:
```ts
app.get('/health', (c) => c.json({ status: 'OK', timestamp: new Date() }));
```

### Monitoring
- **Error Tracking**: Sentry.io integration
- **Performance Monitoring**: Vercel Analytics or Google Lighthouse CI
- **Uptime Monitoring**: Healthchecks.io or similar
- **Logging**: Winston or Pino for structured logs

## Rollback Strategy
1. **Static Hosts**: Most platforms offer instant rollback to previous deploy
2. **Node.js Servers**: Keep previous `dist/` directory and symlink switch
3. **Docker**: Rollback to previous image tag
4. **Database**: Backup before deploy if schema changes

## Common Issues & Solutions

### "Module not found" Error
- Ensure all dependencies are in `package.json`
- Check for typos in import paths
- Verify case sensitivity (Linux vs Windows/macOS)

### Environment Variables Not Loading
- For Vite: Variables must start with `VITE_`
- Restart dev server after adding new env vars
- Check `.env` file location (project root)

### Port Already in Use
- Kill existing process: `lsof -i :3000 | kill`
- Use different port: `PORT=3001 node dist/server/index.js`
- Check Docker port mappings

### SSR Hydration Mismatch
- Ensure identical render on server/client
- Avoid browser-specific APIs in render (use useEffect)
- Check for random values (Math.random, Date.now) in render

## Post-Deployment Checklist
- [ ] Verify site loads correctly on desktop/mobile
- [ ] Test critical user flows (login, checkout, etc.)
- [ ] Check browser console for errors
- [ ] Validate environment variables are set
- [ ] Confirm SSL/TLS is properly configured
- [ ] Test performance with Lighthouse
- [ ] Verify error boundaries work correctly
- [ ] Check that analytics/tracking is firing
- [ ] Confirm email/SMS integrations work
- [ ] Review server logs for errors
- [ ] Test rollback procedure

## Resources
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html
- Netlify Docs: https://docs.netlify.com/site-deploys/create-deploys/
- Vercel Docs: https://vercel.com/docs/concepts/deployments/overview
- Docker Node.js Best Practices: https://github.com/nodejs/docker-node