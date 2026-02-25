# Next.js Multi-Zone Microfrontend PoC

A proof-of-concept demonstrating **Next.js Multi-Zones** — multiple independent Next.js applications composed under a single domain.

## Architecture

| Zone      | Routes                          | Port | Base Path    |
|-----------|---------------------------------|------|--------------|
| Home      | `/`, `/about`                   | 3000 | —            |
| Blog      | `/blog`, `/blog/[slug]`         | 3001 | `/blog`      |
| Dashboard | `/dashboard`, `/dashboard/settings` | 3002 | `/dashboard` |

The **home** zone acts as the gateway: its `next.config.ts` uses `rewrites` to proxy `/blog/*` to port 3001 and `/dashboard/*` to port 3002.

## Cross-Zone Integration

- **Shared UI** — The `@repo/shared` package provides a common `Navigation` bar and `SharedLayout` wrapper used by all zones.
- **Shared State** — User identity is stored in a cookie (`mz_user`), readable by all zones since they share the same domain. Set your name in any zone and it appears everywhere.
- **Routing** — Standard `<a>` tags navigate between zones (full page navigations). Within a zone, Next.js client-side navigation works as usual.

## Getting Started

```bash
npm install
npm run dev
```

This starts all three zones concurrently via Nx. Open [http://localhost:3000](http://localhost:3000) to see the unified app.

### Useful Nx Commands

```bash
npx nx run-many -t build        # Build all projects
npx nx run-many -t dev           # Dev all projects in parallel
npx nx build @repo/home          # Build a single project
npx nx graph                     # Visualize project dependency graph
npx nx show projects             # List all projects
npx nx affected -t build         # Build only affected projects
```

## Project Structure

```
├── apps/
│   ├── home/          # Main zone (port 3000) — gateway with rewrites
│   ├── blog/          # Blog zone (port 3001) — basePath: /blog
│   └── dashboard/     # Dashboard zone (port 3002) — basePath: /dashboard
├── packages/
│   └── shared/        # Shared components: Navigation, SharedLayout, UserContext
├── nx.json            # Nx workspace configuration
└── package.json
```
