import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { TaskService } from "../../../services/task.service";
import { moveTask } from "../../../store/task.reducer";
import { Task } from "../../../models/task.model";

const PRIORITY_COLORS: Record<string,string> = {low:"#10b981",medium:"#f59e0b",high:"#f97316",critical:"#ef4444"};
const COLUMNS = [
  {status:"todo",label:"To Do",color:"#64748b"},
  {status:"in_progress",label:"In Progress",color:"#6366f1"},
  {status:"review",label:"In Review",color:"#f59e0b"},
  {status:"done",label:"Done",color:"#10b981"},
];

@Component({
  selector:"app-kanban", standalone:true,
  template:`
    <div style="padding:32px">
      <h1 style="margin:0 0 24px;font-size:24px;font-weight:800">Kanban Board</h1>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;align-items:start">
        @for(col of columns; track col.status){
          <div style="background:#f1f5f9;border-radius:14px;padding:14px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
              <div [style.background]="col.color" style="width:10px;height:10px;border-radius:50%"></div>
              <h3 style="margin:0;font-size:14px;font-weight:700;color:#374151">{{col.label}}</h3>
              <span style="margin-left:auto;background:#e2e8f0;color:#64748b;border-radius:20px;padding:2px 8px;font-size:12px;font-weight:600">{{getTasksByStatus(col.status).length}}</span>
            </div>
            @for(task of getTasksByStatus(col.status); track task.id){
              <div style="background:#fff;border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid #e2e8f0;cursor:grab"
                   draggable="true" (dragstart)="onDragStart(task)" (dragover)="$event.preventDefault()"
                   (drop)="onDrop($event,col.status)">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">
                  <span [style.background]="getPriorityColor(task.priority)+'20'" [style.color]="getPriorityColor(task.priority)" style="padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase">{{task.priority}}</span>
                  <span style="font-size:11px;color:#94a3b8">{{task.storyPoints}}pts</span>
                </div>
                <p style="margin:0 0 8px;font-size:13px;font-weight:600;line-height:1.4">{{task.title}}</p>
                <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
                  @for(tag of task.tags; track tag){
                    <span style="background:#f1f5f9;color:#64748b;padding:2px 6px;border-radius:4px;font-size:10px">{{tag}}</span>
                  }
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:11px;color:#94a3b8">Due {{task.dueDate}}</span>
                  <img [src]="getMemberAvatar(task.assigneeId)" style="width:24px;height:24px;border-radius:50%;object-fit:cover"/>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class KanbanComponent {
  columns = COLUMNS;
  private allTasks: Task[] = [];
  private localTasks: Task[] = [];
  private draggedTask: Task | null = null;
  private members: any[];

  constructor(private ts: TaskService, private store: Store<any>) {
    this.allTasks = ts.getTasks();
    this.members = ts.getMembers();
    this.store.select("tasks").subscribe((s:any) => {
      this.localTasks = s.tasks.length ? s.tasks : this.allTasks;
    });
    this.localTasks = [...this.allTasks];
  }
  getTasksByStatus(status: string): Task[] { return this.localTasks.filter(t=>t.status===status); }
  getPriorityColor(p: string): string { return PRIORITY_COLORS[p]||"#94a3b8"; }
  getMemberAvatar(id: string): string { return this.members.find(m=>m.id===id)?.avatar||""; }
  onDragStart(task: Task) { this.draggedTask = task; }
  onDrop(e: DragEvent, status: string) {
    e.preventDefault();
    if (this.draggedTask) {
      this.localTasks = this.localTasks.map(t => t.id===this.draggedTask!.id ? {...t,status:status as any} : t);
      this.store.dispatch(moveTask({id:this.draggedTask.id,status}));
      this.draggedTask = null;
    }
  }
}