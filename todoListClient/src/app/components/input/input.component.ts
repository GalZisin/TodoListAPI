import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/providers/todos.actions';
// import { todoSelector } from 'src/app/providers/todos.reducer';
import { Item } from 'src/app/providers/todos.states';
import { TodoService } from 'src/app/services/todo-service.service';
import { NIL as NIL_UUID } from 'uuid';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  todoInput!: string;
  todos: Item[] = [];
  constructor(
    private store: Store,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
  }

  addTodo() {
    const todo: Item = {
      // id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      id: NIL_UUID,
      title: this.todoInput
    }

    this.store.dispatch(actions.addTodo(todo))
    this.todoInput = '';
  }
}
