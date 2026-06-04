import { Component } from "@angular/core";
import { TaskService } from "../../../services/task.service";

@Component({
  selector:"app-gantt", standalone:true,
  template:`
    <div style="padding:32px">
      <h1 style="margin:0 0 6px;font-size:24px;font-weight:800">Gantt Chart</h1>
      <p style="margin:0 0 24px;font-size:14px;color:#64748b">January 2024 — Sprint 12</p>
      <div style="background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden">
        <div style="display:grid;grid-template-columns:220px 1fr;border-bottom:2px solid #e2e8f0">
          <div style="padding:12px 16px;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;border-right:1px solid #e2e8f0">Task</div>
          <div style="display:flex">
            @for(d of days; track d){ <div style="flex:1;padding:10px 0;text-align:center;font-size:11px;color:#94a3b8;border-right:1px solid #f1f5f9">{{d}}</div> }
          </div>
        </div>
        @for(row of ganttRows; track row.id){
          <div style="display:grid;grid-template-columns:220px 1fr;border-bottom:1px solid #f8fafc" [style.background]="row.even?'#fafafa':'#fff'">
            <div style="padding:12px 16px;border-right:1px solid #e2e8f0">
              <p style="margin:0 0 2px;font-size:13px;font-weight:600">{{row.title}}</p>
              <p style="margin:0;font-size:11px;color:#94a3b8">{{row.assignee}}</p>
            </div>
            <div style="display:flex;align-items:center;padding:0 4px;position:relative">
              @for(d of days; track d){<div style="flex:1;height:100%;border-right:1px solid #f1f5f9"></div>}
              <div [style]="getBarStyle(row)" style="position:absolute;height:24px;border-radius:6px;display:flex;align-items:center;padding:0 8px;font-size:11px;color:#fff;font-weight:600;white-space:nowrap;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.15)">
                {{row.title.substring(0,20)}}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class GanttComponent {
  days = Array.from({length:16},(_,i)=>`Jan ${i+14}`);
  ganttRows: any[];
  private members: any[];

  constructor(ts: TaskService) {
    this.members = ts.getMembers();
    const tasks = ts.getTasks();
    this.ganttRows = tasks.map((t,i) => {
      const start = 14 + Math.floor(Math.random()*6);
      const duration = t.storyPoints;
      return { id:t.id, title:t.title, assignee: this.members.find(m=>m.id===t.assigneeId)?.name||"", start, duration, priority:t.priority, status:t.status, even: i%2===0 };
    });
  }

  getBarStyle(row: any): string {
    const pct = ((row.start - 14) / 16) * 100;
    const widthPct = (Math.min(row.duration, 16-row.start+14) / 16) * 100;
    const colors: Record<string,string> = {todo:"#94a3b8",in_progress:"#6366f1",review:"#f59e0b",done:"#10b981"};
    return `left:${pct}%;width:${widthPct}%;background:${colors[row.status]||"#6366f1"}`;
  }
}