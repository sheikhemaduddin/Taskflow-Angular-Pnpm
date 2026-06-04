import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TaskService } from "../../../services/task.service";
import { BaseChartDirective } from "ng2-charts";
import { ChartData } from "chart.js";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const PRIORITY_COLOR: Record<string,string> = {low:"#10b981",medium:"#f59e0b",high:"#f97316",critical:"#ef4444"};

@Component({
  selector:"app-dashboard", standalone:true, imports:[RouterLink,BaseChartDirective],
  template:`
    <div style="padding:32px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px">
        <div>
          <h1 style="margin:0 0 4px;font-size:24px;font-weight:800">Dashboard</h1>
          <p style="margin:0;color:#64748b;font-size:14px">Sprint 12 — Jan 15–29, 2024</p>
        </div>
        <a routerLink="/kanban" style="padding:10px 20px;background:#6366f1;color:#fff;border-radius:10px;font-size:14px;font-weight:600">Open Board</a>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px">
        @for(s of stats; track s.label){
          <div style="background:#fff;border-radius:14px;padding:18px 20px;border:1px solid #e2e8f0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <p style="margin:0 0 4px;font-size:13px;color:#64748b">{{s.label}}</p>
                <p style="margin:0;font-size:26px;font-weight:800;color:#1e293b">{{s.value}}</p>
              </div>
              <span style="font-size:28px">{{s.icon}}</span>
            </div>
          </div>
        }
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:20px">
        <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #e2e8f0">
          <h3 style="margin:0 0 4px;font-size:16px;font-weight:700">Burndown Chart</h3>
          <p style="margin:0 0 16px;font-size:12px;color:#64748b">Sprint 12 — 89 story points</p>
          <canvas baseChart [data]="burndownData" [options]="lineOpts" type="line" height="100"></canvas>
        </div>
        <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #e2e8f0">
          <h3 style="margin:0 0 16px;font-size:16px;font-weight:700">Status Breakdown</h3>
          <canvas baseChart [data]="donutData" [options]="{plugins:{legend:{position:'bottom',labels:{font:{size:11}}}}}" type="doughnut" height="140"></canvas>
        </div>
      </div>

      <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #e2e8f0">
        <h3 style="margin:0 0 16px;font-size:16px;font-weight:700">Recent Tasks</h3>
        @for(t of recentTasks; track t.id){
          <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #f8fafc">
            <span [style.background]="getPriorityColor(t.priority)" style="width:8px;height:8px;border-radius:50%;flex-shrink:0"></span>
            <div style="flex:1">
              <p style="margin:0 0 2px;font-size:14px;font-weight:600">{{t.title}}</p>
              <p style="margin:0;font-size:12px;color:#94a3b8">{{t.tags.join(" · ")}} · Due {{t.dueDate}}</p>
            </div>
            <span [style]="getStatusStyle(t.status)">{{t.status.replace("_"," ")}}</span>
            <img [src]="getMemberAvatar(t.assigneeId)" style="width:28px;height:28px;border-radius:50%;object-fit:cover"/>
          </div>
        }
      </div>
    </div>
  `
})
export class DashboardComponent {
  stats: any[];
  recentTasks: any[];
  burndownData: ChartData<"line">;
  donutData: ChartData<"doughnut">;
  lineOpts: any;
  private tasks: any[];
  private members: any[];

  constructor(ts: TaskService) {
    this.tasks = ts.getTasks();
    this.members = ts.getMembers();
    this.recentTasks = this.tasks.slice(0, 5);
    this.stats = [
      {label:"Total Tasks",value:this.tasks.length,icon:"📋"},
      {label:"In Progress",value:this.tasks.filter(t=>t.status==="in_progress").length,icon:"⚡"},
      {label:"Completed",value:this.tasks.filter(t=>t.status==="done").length,icon:"✅"},
      {label:"Story Points",value:this.tasks.reduce((a:number,t:any)=>a+t.storyPoints,0),icon:"🎯"},
    ];
    const ideal = [89,81,73,65,57,49,41,33,25,17,9,1,0];
    const actual = [89,85,78,72,60,53,45,38,null,null,null,null,null];
    this.burndownData = {
      labels: Array.from({length:13},(_,i)=>`D${i+1}`),
      datasets: [
        {label:"Ideal",data:ideal,borderColor:"#e2e8f0",borderDash:[6,4],tension:0,pointRadius:0,fill:false} as any,
        {label:"Actual",data:actual,borderColor:"#6366f1",backgroundColor:"rgba(99,102,241,.08)",fill:true,tension:.3,pointBackgroundColor:"#6366f1",pointRadius:4} as any,
      ]
    };
    const done = this.tasks.filter(t=>t.status==="done").length;
    const ip = this.tasks.filter(t=>t.status==="in_progress").length;
    const rev = this.tasks.filter(t=>t.status==="review").length;
    const todo = this.tasks.filter(t=>t.status==="todo").length;
    this.donutData = { labels:["Done","In Progress","Review","To Do"], datasets:[{data:[done,ip,rev,todo],backgroundColor:["#10b981","#6366f1","#f59e0b","#94a3b8"],borderWidth:0}] };
    this.lineOpts = { responsive:true, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}},y:{grid:{color:"#f1f5f9"}}} };
  }
  getPriorityColor(p:string):string { return PRIORITY_COLOR[p]||"#94a3b8"; }
  getMemberAvatar(id:string):string { return this.members.find(m=>m.id===id)?.avatar||""; }
  getStatusStyle(s:string):string {
    const m:Record<string,string> = {done:"background:#dcfce7;color:#16a34a",in_progress:"background:#e0e7ff;color:#4338ca",review:"background:#fef9c3;color:#854d0e",todo:"background:#f1f5f9;color:#64748b"};
    return `${m[s]||m["todo"]};padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap`;
  }
}