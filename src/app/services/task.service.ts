import { Injectable } from "@angular/core";
import { Task, Member, Project } from "../models/task.model";

@Injectable({ providedIn:"root" })
export class TaskService {
  private TASKS: Task[] = [
    {id:"t1",title:"Design new dashboard UI",description:"Create Figma mockups for the redesigned analytics dashboard",status:"done",priority:"high",assigneeId:"m1",projectId:"p1",dueDate:"2024-01-18",tags:["design","ui"],storyPoints:5,timeLogged:6},
    {id:"t2",title:"Implement OAuth2 login",description:"Add Google and GitHub OAuth2 authentication to the auth flow",status:"in_progress",priority:"critical",assigneeId:"m2",projectId:"p1",dueDate:"2024-01-22",tags:["backend","auth"],storyPoints:8,timeLogged:4},
    {id:"t3",title:"Write unit tests for API",description:"Achieve 80% test coverage on all API endpoints",status:"in_progress",priority:"medium",assigneeId:"m3",projectId:"p1",dueDate:"2024-01-25",tags:["testing","backend"],storyPoints:5,timeLogged:3},
    {id:"t4",title:"Mobile responsive fixes",description:"Fix layout issues on screens smaller than 768px",status:"review",priority:"high",assigneeId:"m1",projectId:"p2",dueDate:"2024-01-20",tags:["css","mobile"],storyPoints:3,timeLogged:5},
    {id:"t5",title:"Set up CI/CD pipeline",description:"Configure GitHub Actions for automated testing and deployment",status:"todo",priority:"medium",assigneeId:"m4",projectId:"p1",dueDate:"2024-01-28",tags:["devops"],storyPoints:8,timeLogged:0},
    {id:"t6",title:"Integrate payment gateway",description:"Add Stripe payment processing for subscription plans",status:"todo",priority:"critical",assigneeId:"m2",projectId:"p2",dueDate:"2024-01-30",tags:["backend","payments"],storyPoints:13,timeLogged:0},
    {id:"t7",title:"Database query optimization",description:"Identify and optimize slow N+1 queries in the ORM",status:"review",priority:"high",assigneeId:"m3",projectId:"p1",dueDate:"2024-01-21",tags:["backend","performance"],storyPoints:5,timeLogged:7},
    {id:"t8",title:"Documentation update",description:"Update API documentation with new endpoint changes",status:"todo",priority:"low",assigneeId:"m1",projectId:"p2",dueDate:"2024-02-01",tags:["docs"],storyPoints:2,timeLogged:0},
  ];
  private MEMBERS: Member[] = [
    {id:"m1",name:"Alex Rivera",avatar:"https://i.pravatar.cc/40?img=1",role:"Frontend Lead",tasksOpen:3,tasksCompleted:28,hoursThisWeek:38},
    {id:"m2",name:"Sarah Chen",avatar:"https://i.pravatar.cc/40?img=5",role:"Backend Engineer",tasksOpen:2,tasksCompleted:41,hoursThisWeek:42},
    {id:"m3",name:"Marcus Webb",avatar:"https://i.pravatar.cc/40?img=3",role:"Full Stack Dev",tasksOpen:2,tasksCompleted:33,hoursThisWeek:36},
    {id:"m4",name:"Aisha Johnson",avatar:"https://i.pravatar.cc/40?img=7",role:"DevOps Engineer",tasksOpen:1,tasksCompleted:19,hoursThisWeek:35},
  ];
  private PROJECTS: Project[] = [
    {id:"p1",name:"Platform v3.0",status:"active",progress:62,deadline:"2024-03-01",teamSize:4},
    {id:"p2",name:"Mobile App",status:"active",progress:38,deadline:"2024-04-15",teamSize:3},
  ];
  getTasks(): Task[] { return this.TASKS; }
  getMembers(): Member[] { return this.MEMBERS; }
  getProjects(): Project[] { return this.PROJECTS; }
  getMember(id:string): Member|undefined { return this.MEMBERS.find(m=>m.id===id); }
  getTasksByStatus(status:string): Task[] { return this.TASKS.filter(t=>t.status===status); }
}