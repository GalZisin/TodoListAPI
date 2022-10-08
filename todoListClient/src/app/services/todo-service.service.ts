import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, timeout } from 'rxjs';
import { Item } from '../providers/todos.states';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  isMobile$ = new BehaviorSubject<boolean>(false);
  baseUrl = 'http://localhost:7047/api/TodoList'
  constructor(private http: HttpClient) {

  }

  //Get all Todos
  getAllTodos(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  addTodo(todo: Item): Observable<Item> {
    // todo.id = '00000000-0000-0000-0000-0000000000';
    return this.http.post<Item>(this.baseUrl, todo);
  }

  editTodo(todo: Item,): Observable<Item> {
    const updatedTodo: Item = {
      id: todo.id,
      title: todo.title

    }
    return this.http.put<Item>(`${this.baseUrl}/${updatedTodo.id}`, updatedTodo);
  }

  deleteTodo(todoId: string): Observable<Item> {
    return this.http.delete<Item>(`${this.baseUrl}/${todoId}`);
  }
}
