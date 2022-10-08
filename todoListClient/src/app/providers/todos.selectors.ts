import { createSelector } from "@ngrx/store";
import { AppState } from "./todos.reducer";
import { Item } from "./todos.states";

const appState = (state: any) => state as AppState;


export class TodosSelectors {

  static selectTodos = createSelector(
    appState, (state) => state.todos
  )
}
