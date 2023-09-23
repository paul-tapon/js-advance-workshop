import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Todo } from './common/todoTypes';
import { TodoStoreService } from './common/todo-store.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {

    //showAddForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    openAddEditForm$: Observable<boolean>;



 
    todoEdit : Todo;

    constructor(private todoStoreService : TodoStoreService)
    {
        
    }

    ngOnInit(): void {
        this.todoStoreService.currentTodo$.subscribe(todo=>{
            if(todo)
            {
                this.todoEdit = todo;
                //this.showAddForm$.next(true);
            }
        });


        // this.openAddEditForm$= this.todoStoreService.
        //                         openAddEditForm$.pipe(

        //                             tap((tapData)=>{
        //                                     console.log("openAddEditForm$",tapData);
        //                             })
        //                         );

    }

    showAddForm() {
        this.todoStoreService.showAddEditForm();
        // this.showAddForm$.next(true);
        this.todoEdit = null;
    }

    onCancelAdd(eventData: boolean) {
        this.todoStoreService.hideAddEditForm();
        // this.showAddForm$.next(false);
        this.todoEdit = null;
    }


}
