import { ActionCreator, ActionCreatorProps, createAction, props } from "@ngrx/store";
import { Item } from "./todos.states";

const addTodo = createAction("[TODO] ADD_TODO", props<{ todo: Item }>());
const updateTodo = createAction("[TODO] UPDATE_TODO", props<{ todo: Item }>());
const deleteTodo = createAction("[TODO] DELETE_TODO", props<{ id: any }>());
const getTodos = createAction("[TODO] GET_TODOS");
const getTodosSuccess = createAction("[TODO] GET_TODOS_SUCCESS", props<{ [todos: string]: Item[] }>());
const updateTodoSuccess = createAction("[TODO] UPDATE_TODO_SUCCESS", props<{ todo: Item }>());
const addTodoSuccess = createAction("[TODO] ADD_TODO_SUCCESS", props<{ todo: Item }>());
const deleteTodoSuccess = createAction("[TODO] DELETE_TODO_SUCCESS", props<{ todo: Item }>());
export const actions: any = {
  addTodo,
  updateTodo,
  deleteTodo,
  getTodos,
  getTodosSuccess,
  addTodoSuccess,
  updateTodoSuccess,
  deleteTodoSuccess
};
