import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Todo } from './common/todoTypes';
import { TodoStoreService } from './common/todo-store.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
})
export class TodoComponent {

    @ViewChild('todoList') todoListComponent :TodoListComponent;
    showAddForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
 
    todoEdit : Todo;

    constructor(private todoStoreService : TodoStoreService)
    {
        
    }

    showAddForm() {
        this.showAddForm$.next(true);
        this.todoEdit = null;
    }

    onCancelAdd(eventData: boolean) {
        this.showAddForm$.next(false);
        this.todoEdit = null;

    }

    onEmitUpdateTodo(todo:Todo) {
        this.todoEdit = todo;
        this.showAddForm$.next(true);
    }


}
