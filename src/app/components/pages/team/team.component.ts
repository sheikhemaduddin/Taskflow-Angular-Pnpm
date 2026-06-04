import { Component } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import { Member } from "../../../models/task.model";

@Component({
  selector:"app-team", standalone:true,
  template:`
    <div style="padding:32px;max-width:1000px">
      <h1 style="margin:0 0 24px;font-size:24px;font-weight:800">Team Members</h1>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px">
        @for(m of members; track m.id){
          <div style="background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e8f0;display:flex;gap:16px;align-items:flex-start">
            <img [src]="m.avatar" [alt]="m.name" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid #e0e7ff;flex-shrink:0"/>
            <div style="flex:1">
              <h3 style="margin:0 0 2px;font-size:16px;font-weight:700">{{m.name}}</h3>
              <p style="margin:0 0 14px;font-size:13px;color:#6366f1;font-weight:500">{{m.role}}</p>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
                @for(stat of getStats(m); track stat.label){
                  <div style="background:#f8fafc;border-radius:10px;padding:10px;text-align:center">
                    <p style="margin:0 0 2px;font-size:16px;font-weight:800;color:#1e293b">{{stat.value}}</p>
                    <p style="margin:0;font-size:10px;color:#94a3b8">{{stat.label}}</p>
                  </div>
                }
              </div>
              <div style="margin-top:12px">
                <p style="margin:0 0 4px;font-size:11px;color:#64748b">Task completion rate</p>
                <div style="background:#f1f5f9;border-radius:20px;height:6px;overflow:hidden">
                  <div [style.width]="getCompletion(m)+'%'" style="height:100%;background:#6366f1;border-radius:20px;transition:width .3s"></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class TeamComponent {
  members: Member[];
  constructor(ts: TaskService) { this.members = ts.getMembers(); }
  getStats(m: Member) { return [{label:"Open Tasks",value:m.tasksOpen},{label:"Completed",value:m.tasksCompleted},{label:"Hrs/week",value:m.hoursThisWeek}]; }
  getCompletion(m: Member): number { return Math.round(m.tasksCompleted/(m.tasksCompleted+m.tasksOpen)*100); }
}