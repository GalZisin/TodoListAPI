import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable, timeout } from 'rxjs';
import { actions } from 'src/app/providers/todos.actions';
import { TodosSelectors } from 'src/app/providers/todos.selectors';
import { Item } from 'src/app/providers/todos.states';
import { LoaderService } from 'src/app/services/loader.service';
import { TodoService } from 'src/app/services/todo-service.service';

// type record = Record<string, Item[]>;
interface ItemDictionary {
  [todos: string]: Item[];
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  // todos: any[] = [];
  allTodos$!: Observable<ItemDictionary>;

  constructor(
    private store: Store,
    private todoService: TodoService,
    public loaderService: LoaderService) {
    this.allTodos$ = this.store.select<any>(TodosSelectors?.selectTodos);
    console.log("items: ", this.allTodos$)
  }

  ngOnInit(): void {
    // this.todoService.getAllTodos().subscribe(res => {
    //   console.log(res);
    // });
    this.store.dispatch(actions.getTodos());
  }
}
