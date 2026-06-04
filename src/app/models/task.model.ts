export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type Priority = "low" | "medium" | "high" | "critical";
export interface Task {
  id: string; title: string; description: string; status: TaskStatus; priority: Priority;
  assigneeId: string; projectId: string; dueDate: string; tags: string[]; storyPoints: number; timeLogged: number;
}
export interface Member { id:string; name:string; avatar:string; role:string; tasksOpen:number; tasksCompleted:number; hoursThisWeek:number; }
export interface Project { id:string; name:string; status:string; progress:number; deadline:string; teamSize:number; }