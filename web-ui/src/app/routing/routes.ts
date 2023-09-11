import { Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { LoginComponent } from "../authentication/login/login.component";
import { authGuard } from "./authGuard";
import { TodoComponent } from "../todo/todo.component";

const routes: Routes = 
[
  {
    path :'',
    component : LoginComponent
  },
  {
    path :'login',
    component : LoginComponent
  },
  {
    path : 'app',
    component : AppComponent,
    canActivate : [authGuard],
    children :
    [
      {
        path : 'todo',
        component : TodoComponent,
        canActivate : [authGuard],
      }
    ]
  }
];

export default routes;