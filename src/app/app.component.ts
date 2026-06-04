import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouterLink, RouterLinkActive } from "@angular/router";
@Component({
  selector:"app-root", standalone:true, imports:[RouterOutlet,RouterLink,RouterLinkActive],
  template:`
    <div style="display:flex;min-height:100vh">
      <nav style="width:220px;background:#1e293b;color:#e2e8f0;display:flex;flex-direction:column;padding:24px 16px;flex-shrink:0;position:fixed;height:100vh;z-index:100">
        <div style="margin-bottom:32px;padding:0 8px">
          <h1 style="margin:0;font-size:20px;font-weight:800;color:#fff">Task<span style="color:#6366f1">Flow</span></h1>
          <p style="margin:4px 0 0;font-size:12px;color:#64748b">Project Management</p>
        </div>
        @for(n of nav; track n.path){
          <a [routerLink]="n.path" routerLinkActive="active-nav" [routerLinkActiveOptions]="{exact:n.exact}"
             style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:14px;font-weight:500;color:#94a3b8;margin-bottom:4px;text-decoration:none">
            <span style="font-size:18px">{{n.icon}}</span>{{n.label}}
          </a>
        }
      </nav>
      <main style="flex:1;margin-left:220px;min-height:100vh"><router-outlet/></main>
    </div>
  `,
  styles:[`.active-nav{color:#fff!important;background:#334155!important}`]
})
export class AppComponent {
  nav = [
    {path:"",label:"Dashboard",icon:"📊",exact:true},
    {path:"kanban",label:"Kanban",icon:"📋",exact:false},
    {path:"gantt",label:"Gantt Chart",icon:"📅",exact:false},
    {path:"analytics",label:"Analytics",icon:"📈",exact:false},
    {path:"team",label:"Team",icon:"👥",exact:false},
  ];
}