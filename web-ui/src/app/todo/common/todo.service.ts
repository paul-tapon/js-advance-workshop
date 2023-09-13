import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo, TodoPatchResponse } from './todoTypes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Todo[]>(`/todo`);
  }

  search(searchQuery:string) {
    return this.http.get<Todo[]>(`/todo/search?title=${searchQuery}&description=${searchQuery}`);
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`/todo`, todo);
  }

  getById(id:number): Observable<Todo> {
    return this.http.get<Todo>(`/todo/${id}`);
  }

  remove(id) {
    return this.http.delete(`/todo/${id}`);
  }

  patch(id:number,todo:Todo) : Observable<TodoPatchResponse>
  {
    return this.http.patch<TodoPatchResponse>(`/todo/${id}`, todo);
  }

  setCompleted(id: string, isCompleted: boolean) {
    return this.http.put<Todo>(`/todo/${id}`, {isCompleted});
  }

}
