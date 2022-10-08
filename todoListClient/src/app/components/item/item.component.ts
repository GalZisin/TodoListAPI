import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/providers/todos.actions';
import { Item } from 'src/app/providers/todos.states';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() todo!: any;
  editTodo: boolean = false;
  todoInput?: any;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.todoInput = this.todo?.title;
  }

  updateToggle() {
    this.editTodo = !this.editTodo;
  }

  updateTodo() {
    this.editTodo = !this.editTodo;
    if (this.todoInput!.trim().length > 0)
      this.store.dispatch(actions.updateTodo({
        id: this.todo!.id,
        title: this.todoInput!.trim(),
      }));
  }

  deleteTodo() {
    const result = confirm("Are you sure to delete?");
    if (result) {
      this.store.dispatch(actions.deleteTodo({
        id: this.todo!.id,
      }));
    }
  }



}
