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
| Build command | `pnpm run build` |
| Output directory | `dist/taskflow-angular` |

The build flattens Angular's `browser/` output so `index.html` is served from the publish root.
