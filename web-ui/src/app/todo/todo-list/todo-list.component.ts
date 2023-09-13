import { Component, EventEmitter, Output } from '@angular/core';
import { TodoStoreService } from '../common/todo-store.service';
import { Todo } from '../common/todoTypes';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {

  @Output()
  emitUpdateTodo:EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(public todoStoreService: TodoStoreService) {}

  todosTrackFn = (i, todo) => todo.id;

  searchTodo(searchQuery:string)
  {
    this.todoStoreService.search(searchQuery);
  }

  onUpdateTodo(todo:Todo)
  {
    this.emitUpdateTodo.emit(todo);
  }
}
