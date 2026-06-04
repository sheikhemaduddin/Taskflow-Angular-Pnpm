import { createReducer, on, createAction, props } from "@ngrx/store";
import { Task } from "../models/task.model";
export const moveTask = createAction("[Task] Move", props<{id:string;status:string}>());
export const addTask = createAction("[Task] Add", props<{task:Task}>());
export const taskReducer = createReducer({tasks:[] as Task[]},
  on(moveTask,(state,{id,status})=>({tasks:state.tasks.map(t=>t.id===id?{...t,status:status as any}:t)})),
  on(addTask,(state,{task})=>({tasks:[...state.tasks,task]})),
);