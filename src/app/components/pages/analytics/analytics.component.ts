import { Component, OnInit, OnDestroy } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import { BaseChartDirective } from "ng2-charts";
import { ChartData } from "chart.js";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler);

@Component({
  selector:"app-analytics", standalone:true, imports:[BaseChartDirective],
  template:`
    <div style="padding:32px">
      <h1 style="margin:0 0 6px;font-size:24px;font-weight:800">Analytics</h1>
      <p style="margin:0 0 24px;font-size:14px;color:#64748b">Team velocity and project health metrics</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
        <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #e2e8f0">
          <h3 style="margin:0 0 4px;font-size:16px;font-weight:700">Sprint Velocity</h3>
          <p style="margin:0 0 16px;font-size:12px;color:#64748b">Story points completed per sprint</p>
          <canvas baseChart [data]="velocityData" [options]="barOpts" type="bar" height="100"></canvas>
        </div>
        <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #e2e8f0">
          <h3 style="margin:0 0 4px;font-size:16px;font-weight:700">Team Workload</h3>
          <p style="margin:0 0 16px;font-size:12px;color:#64748b">Hours logged this week by member</p>
          <canvas baseChart [data]="workloadData" [options]="barOpts" type="bar" height="100"></canvas>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px">
        <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #e2e8f0">
          <h3 style="margin:0 0 16px;font-size:16px;font-weight:700">Task Completion Trend</h3>
          <canvas baseChart [data]="trendData" [options]="lineOpts" type="line" height="90"></canvas>
        </div>
        <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #e2e8f0">
          <h3 style="margin:0 0 16px;font-size:16px;font-weight:700">By Priority</h3>
          <canvas baseChart [data]="priorityData" [options]="{plugins:{legend:{position:'bottom',labels:{font:{size:11}}}}}" type="doughnut" height="140"></canvas>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent implements OnInit {
  velocityData!: ChartData<"bar">;
  workloadData!: ChartData<"bar">;
  trendData!: ChartData<"line">;
  priorityData!: ChartData<"doughnut">;
  barOpts = { responsive:true, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}},y:{grid:{color:"#f1f5f9"}}} };
  lineOpts = { responsive:true, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}},y:{grid:{color:"#f1f5f9"}}} };

  constructor(ts: TaskService) {
    const tasks = ts.getTasks();
    const members = ts.getMembers();
    this.velocityData = { labels:["S7","S8","S9","S10","S11","S12"], datasets:[{data:[72,85,63,91,78,89],backgroundColor:"#6366f1",borderRadius:6}] };
    this.workloadData = { labels:members.map(m=>m.name.split(" ")[0]), datasets:[{data:members.map(m=>m.hoursThisWeek),backgroundColor:["#6366f1","#10b981","#f59e0b","#06b6d4"],borderRadius:6}] };
    const weeks = ["Dec W1","Dec W2","Dec W3","Dec W4","Jan W1","Jan W2"];
    this.trendData = { labels:weeks, datasets:[
      {label:"Completed",data:[8,11,7,14,12,10],fill:true,borderColor:"#10b981",backgroundColor:"rgba(16,185,129,.08)",tension:.4} as any,
      {label:"Created",data:[12,9,13,10,15,8],fill:false,borderColor:"#6366f1",tension:.4} as any,
    ]};
    const critical = tasks.filter(t=>t.priority==="critical").length;
    const high = tasks.filter(t=>t.priority==="high").length;
    const medium = tasks.filter(t=>t.priority==="medium").length;
    const low = tasks.filter(t=>t.priority==="low").length;
    this.priorityData = { labels:["Critical","High","Medium","Low"], datasets:[{data:[critical,high,medium,low],backgroundColor:["#ef4444","#f97316","#f59e0b","#10b981"],borderWidth:0}] };
  }
  ngOnInit() {}
}