import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  
  showAddForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showAddForm() {
    this.showAddForm$.next(true);
  }

  onCancelAdd(eventData : boolean) {

    console.log("on cancell add handler")

    this.showAddForm$.next(false);
  }
}
