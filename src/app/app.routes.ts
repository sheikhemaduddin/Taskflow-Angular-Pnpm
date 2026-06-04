import { Routes } from "@angular/router";
export const routes: Routes = [
  { path:"", loadComponent:()=>import("./components/pages/dashboard/dashboard.component").then(m=>m.DashboardComponent) },
  { path:"kanban", loadComponent:()=>import("./components/pages/kanban/kanban.component").then(m=>m.KanbanComponent) },
  { path:"gantt", loadComponent:()=>import("./components/pages/gantt/gantt.component").then(m=>m.GanttComponent) },
  { path:"analytics", loadComponent:()=>import("./components/pages/analytics/analytics.component").then(m=>m.AnalyticsComponent) },
  { path:"team", loadComponent:()=>import("./components/pages/team/team.component").then(m=>m.TeamComponent) },
  { path:"**", redirectTo:"" }
];