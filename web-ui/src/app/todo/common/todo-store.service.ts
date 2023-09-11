import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { BehaviorSubject, Observable, Subscription, catchError, map, pipe, tap, throwError } from 'rxjs';
import { Todo } from './todoTypes';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TodoStoreService {
    constructor(private todosService: TodoService) {
        console.log('TodoStoreService constructor');
        this.getAll();
    }

    // - We set the initial state in BehaviorSubject's constructor
    // - Nobody outside the Store should have access to the BehaviorSubject
    //   because it has the write rights
    // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
    // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
    //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
    private readonly _todos = new BehaviorSubject<Todo[]>([]);

    readonly todos$ = this._todos.asObservable();

    // we'll compose the todos$ observable with map operator to create a stream of only completed todos
    readonly completedTodos$ = this.todos$.pipe(
        map(todos => todos.filter(todo => todo.isCompleted))
    );

    readonly uncompletedTodos$ = this.todos$.pipe(
        map(todos => todos.filter(todo => !todo.isCompleted))
    );

    // the getter will return the last value emitted in _todos subject
    get todos(): Todo[] {
        return this._todos.getValue();
    }

    // assigning a value to this.todos will push it onto the observable
    // and down to all of its subsribers (ex: this.todos = [])
    set todos(val: Todo[]) {
        this._todos.next(val);
    }

    addTodo(todo: Todo) : Subscription {
        todo.todoId = 0;

        //optimistic update - we will not wait from the API for success response, this will look our platform is fast :)
        //if the create operation is failed we will handle it separately :)
        this.todos = [...this.todos, todo];

        return this.todosService
            .create(todo)
            .pipe(
                tap((response: Todo) => {}),
                catchError(error => this.handleCreateError(error, todo))
            )
        .subscribe();
    }

    async removeTodo(id: number, serverRemove = true) {
        const todo = this.todos.find(t => t.todoId === id);
        this.todos = this.todos.filter(todo => todo.todoId !== id);

        //TODO : call actual api delete

        // if(serverRemove) {
        //   try {
        //     //await this.todosService.remove(id).toPromise();
        //   } catch (e) {
        //     console.error(e);
        //     this.todos = [...this.todos, todo];
        //   }
        // }
    }

    getAll() {
        this.todosService.getAll().subscribe(todos => (this.todos = todos));
    }

    private handleCreateError(error: HttpErrorResponse, todoRequest: Todo) {
        let errorMessage = '';
        console.log('handleCreateError');
        this.removeTodo(0, false);
        return throwError(() => errorMessage);
    }
}
