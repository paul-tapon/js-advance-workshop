import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../common/todoTypes';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { TodoStoreService } from '../common/todo-store.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  @Output()
  emitCloseAdddForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  createTodoFormGroup: FormGroup;

  @Output() cancelEdit = new EventEmitter<Todo>();
  @Output() editFormSubmitted = new EventEmitter<Todo>();

  constructor(
    private formBuilder: FormBuilder,
    public todoStoreService: TodoStoreService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  //read only properties of each fields in form group
  get title() {
    return this.createTodoFormGroup.get('title');
  }
  get description() {
    return this.createTodoFormGroup.get('description');
  }
  get dueDate() {
    return this.createTodoFormGroup.get('dueDate');
  }

  onCancelAdd() {
    console.log('on cancell add');
    this.emitCloseAdddForm.emit(true);
  }

  onSubmitForm() {
    console.log(this.createTodoFormGroup.value);

    this.todoStoreService.addTodo(this.createTodoFormGroup.value as Todo);

    this.emitCloseAdddForm.emit(true);

  }

  onMyDateChange(event: any) {
    this.createTodoFormGroup.patchValue({ dueDate: event.target.value });
  }


  private buildForm() {
    this.createTodoFormGroup = this.formBuilder.group({
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
  }


}
