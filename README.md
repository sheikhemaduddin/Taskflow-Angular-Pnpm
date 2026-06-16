# TaskFlow — Project Management (Angular + pnpm)

Full project management SPA with Kanban board, Gantt chart, sprint burndown, team workload charts.

## Features
- **Kanban board** with drag-and-drop task movement (HTML5 drag API)
- **Gantt chart** — visual task timeline
- Sprint burndown chart (Chart.js)
- Analytics: velocity, workload, completion trend, priority breakdown
- Team member profiles with task stats
- NgRx state for task status management

## Setup
```bash
pnpm install
pnpm start      # http://localhost:4200
pnpm build
```

## Deploy (Cloudways / static hosting)
```bash
pnpm install          # install dependencies
pnpm run build        # compile to dist/taskflow-angular
```

| Setting | Value |
|---------|-------|
| Install command | `pnpm install` |
| Build command | `pnpm run build` |
| Output directory | `dist/taskflow-angular` |
| Node version | `>=18.13.0` (see `.nvmrc`) |
| pnpm version | `11.5.2` |

The build flattens Angular's `browser/` output so `index.html` is served from the publish root. On pnpm 11 hosts, `pnpm-workspace.yaml` must allow `esbuild` build scripts.
