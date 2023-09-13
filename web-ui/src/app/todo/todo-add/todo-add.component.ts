import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../common/todoTypes';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { TodoStoreService } from '../common/todo-store.service';
import { NotificationService } from 'src/app/common-services/notification.service';

@Component({
    selector: 'app-todo-add',
    templateUrl: './todo-add.component.html',
})
export class TodoAddComponent implements OnInit {
    @Output()
    emitCloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

    todoFormGroup: FormGroup;
    private _todoEdit: Todo;

    constructor(
        private formBuilder: FormBuilder,
        public todoStoreService: TodoStoreService,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    //read only properties of each fields in form group
    get title() {
        return this.todoFormGroup.get('title');
    }
    get description() {
        return this.todoFormGroup.get('description');
    }
    get dueDate() {
        return this.todoFormGroup.get('dueDate');
    }

    @Input()
    set todoEdit(value: Todo) {
        this._todoEdit = value;
        if (this.todoFormGroup) this.displayTodoEditValues(this._todoEdit);
    }

    get todoEdit() {
        return this._todoEdit;
    }

    onCancelAdd() {
        this.emitCloseForm.emit(true);
    }

    onSubmitForm() {
        console.log(this.todoFormGroup.value);
        if (this._todoEdit) {
            this.todoStoreService.updateTodo(
                this._todoEdit.todoId,
                this.todoFormGroup.value as Todo
            );
            this.notificationService.showSuccess(
                'Todo successfully updated.',
                ''
            );
        } else {
            this.todoStoreService.addTodo(this.todoFormGroup.value as Todo);
            this.notificationService.showSuccess(
                'Todo successfully created.',
                ''
            );
        }

        this.emitCloseForm.emit(true);
    }

    onMyDateChange(event: any) {
        this.todoFormGroup.patchValue({ dueDate: event.target.value });
    }

    private buildForm() {
        this.todoFormGroup = this.formBuilder.group({
            title: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
            ]),
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(100),
            ]),
            dueDate: new FormControl('', Validators.required),
        });

        if (this._todoEdit) {
            this.displayTodoEditValues(this._todoEdit);
        }
    }

    private displayTodoEditValues(todo: Todo): void {
        this.todoStoreService.getById(todo.todoId).subscribe(todoDto => {
            this.todoFormGroup.patchValue(todoDto);
            this._todoEdit = todoDto;
        });
    }
}
