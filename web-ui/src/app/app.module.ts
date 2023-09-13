import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './authentication/login/login.component';
import { RootComponent } from './root/root.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { environment } from 'src/environments/environment';
import { ApiInterceptor } from 'src/http/ApiInterceptor';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoSearchComponent } from './todo/todo-search/todo-search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RootComponent,
    FooterComponent,
    SidebarComponent,
    TodoListComponent,
    TodoComponent,
    TodoAddComponent,
    TodoSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  bootstrap: [RootComponent],
  providers :
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    { provide: 'apiBaseUrl', useValue: environment.apiBaseUrl },
  ]
})
export class AppModule { }
