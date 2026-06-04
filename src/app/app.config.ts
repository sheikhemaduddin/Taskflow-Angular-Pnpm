import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideStore } from "@ngrx/store";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { taskReducer } from "./store/task.reducer";
export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes), provideStore({ tasks: taskReducer }), provideAnimations() ]
};