import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
    selector: 'app-todo-search',
    templateUrl: './todo-search.component.html',
})
export class TodoSearchComponent implements OnInit {
    @Output() emitSearch = new EventEmitter<string>();
    searchControl: FormControl;

    ngOnInit(): void {
      this.searchControl = new FormControl('');


      this.searchControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          filter((input:string)=>input.length > 4)
        )
        .subscribe(query => {
            this.emitSearch.emit(this.searchControl.value);
        });
    }

}
