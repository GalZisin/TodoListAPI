import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from "../services/todo-service.service";
import { map, exhaustMap, catchError, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { actions } from '../providers/todos.actions';
import { Item } from "../providers/todos.states";
import { Store } from '@ngrx/store';
import { AppState } from "../providers/todos.reducer";


@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store<AppState>,
  ) { }

  getTodos$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(actions.getTodos),
      exhaustMap(() =>
        this.todoService.getAllTodos().pipe(
          map((todos: Item[]) => {
            console.log("items:", todos)
            return actions.getTodosSuccess({ todos: todos })
          }),
          tap(todos => console.log("tap todolist: ", todos.todos)),
          catchError((error): any => console.log(error)))
      )
    )
  )

  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.addTodo),
        withLatestFrom(this.store.select(actions.getTodos)),
        mergeMap(([todo, action]) =>
          this.todoService.addTodo(todo).pipe(
            map((todo) => actions.addTodoSuccess(todo)),
            catchError((error): any => console.log(error))
          )
        ),
      ),
  );

  updateTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updateTodo),
        withLatestFrom(this.store.select(actions.getTodos)),
        mergeMap(([todo, action]) =>
          this.todoService.editTodo(todo).pipe(
            map((todo) => actions.updateTodoSuccess(todo)),
            catchError((error): any => console.log(error))
          )
        ),
      ),
  );

  deleteTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.deleteTodo),
        withLatestFrom(this.store.select(actions.getTodos)),
        mergeMap(([todo, action]) =>
          this.todoService.deleteTodo(todo.id).pipe(
            map((todo) => actions.deleteTodoSuccess(todo)),
            catchError((error): any => console.log(error))
          )
        ),
      ),
  );
}



