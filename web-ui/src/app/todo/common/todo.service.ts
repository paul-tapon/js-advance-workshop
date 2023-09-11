import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './todoTypes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Todo[]>(`/todo`);
  }


  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`/todo`, todo);
  }


  remove(id) {
    return this.http.delete(`/todo/${id}`);
  }

  setCompleted(id: string, isCompleted: boolean) {
    return this.http.put<Todo>(`/todo/${id}`, {isCompleted});
  }

}
