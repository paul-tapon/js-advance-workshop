import { Component } from '@angular/core';
import { TodoStoreService } from '../common/todo-store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(public todoStoreService: TodoStoreService) {}

  todosTrackFn = (i, todo) => todo.id;
}
