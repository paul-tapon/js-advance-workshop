import { Component, EventEmitter, Output } from '@angular/core';
import { TodoStoreService } from '../common/todo-store.service';
import { Todo } from '../common/todoTypes';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {

  constructor(public todoStoreService: TodoStoreService) {}

  todosTrackFn = (i, todo) => todo.id;

  onUpdateTodo(todo:Todo)
  {
    this.todoStoreService.currrentTodo = todo;
  }
}
