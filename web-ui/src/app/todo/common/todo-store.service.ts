import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { BehaviorSubject, Observable, Subscription, catchError, map, pipe, tap, throwError } from 'rxjs';
import { Todo, TodoPatchResponse } from './todoTypes';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TodoStoreService {
    
    private readonly _todos = new BehaviorSubject<Todo[]>([]);

    private readonly _currentTodo = new BehaviorSubject<Todo>(undefined);

    private readonly _openAddEditForm$ = new BehaviorSubject(false);

    readonly openAddEditForm$ = this._openAddEditForm$.asObservable();

    readonly currentTodo$ = this._currentTodo.asObservable();

    readonly todos$ = this._todos.asObservable();

    readonly completedTodos$ = this.todos$.pipe(
        map(todos => todos.filter(todo => todo.isCompleted))
    );

    readonly uncompletedTodos$ = this.todos$.pipe(
        map(todos => todos.filter(todo => !todo.isCompleted))
    );

    constructor(private todosService: TodoService) {
        this.getAll();
    }

    get todos(): Todo[] {
        return this._todos.getValue();
    }


    set todos(val: Todo[]) {
        this._todos.next(val);
    }


    get currrentTodo() : Todo
    {
        return this._currentTodo.getValue();
    }

    set currrentTodo(val:Todo) 
    {
        this._currentTodo.next(val);
    }

    showAddEditForm() : void
    {
        this._openAddEditForm$.next(true);
    }

    hideAddEditForm() : void
    {
        this._openAddEditForm$.next(false);
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

    removeTodo(id: number, serverRemove = true) {
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

    updateTodo(id:number,todo: Todo) : Subscription {
        const todoInstance = this.todos.find(t => t.todoId === id);

        //optimistic update
        todoInstance.title = todo.title;
        todoInstance.description = todo.description;
        todoInstance.dueDate = todo.dueDate;

        //optimistic update - we will not wait from the API for success response, this will look our platform is fast :)
        //if the create operation is failed we will handle it separately :)
        //this.todos = [...this.todos, todo];

        return this.todosService
            .patch(id,todo)
            .pipe(
                tap((response:TodoPatchResponse) => {}),
                catchError(error => this.handleUpdateError(error, todo))
            )
        .subscribe();
    }

    getAll() {
        this.todosService.getAll().subscribe(todos => (this.todos = todos));
    }

    search(searchQuery:string) {
        this.todosService.search(searchQuery).subscribe(todos => (this.todos = todos));
    }

    getById(id:number):Observable<Todo>{
        return this.todosService.getById(id);
    }


    private handleCreateError(error: HttpErrorResponse, todoRequest: Todo) {
        let errorMessage = 'Create error';
        this.removeTodo(0, false);
        return throwError(() => errorMessage);
    }

    private handleUpdateError(error: HttpErrorResponse, todoRequest: Todo) {
        let errorMessage = 'Update error';
        return throwError(() => errorMessage);
    }
}
