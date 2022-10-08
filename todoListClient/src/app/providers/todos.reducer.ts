import { createReducer, on } from "@ngrx/store";
import { Item, todos } from "./todos.states";
import { actions } from '../providers/todos.actions';

export interface AppState {
  todos: Item[];
}

export const todoReducer = createReducer(
  todos,
  on(actions.getTodosSuccess,
    (state, todos): any => ({
      ...state,
      // todos: todos['todos']
      todos: [...todos.todos]
    })
  ),
  on(actions.addTodoSuccess, (state: any, todo) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(actions.updateTodoSuccess, (state: any, todo) => ({
    ...state,
    todos: state.todos.map((t: any) =>
      t.id === todo.id ? { ...t, title: todo.title } : t
    ),
  })
  ),
  on(actions.deleteTodoSuccess, (state: any, todo) => ({
    ...state,
    todos: state.todos.filter((t: any) => t.id !== todo.id)
  })
  ),
)
