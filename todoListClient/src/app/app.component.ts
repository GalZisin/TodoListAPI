import { Component, HostListener, OnInit } from '@angular/core';
import { TodoService } from './services/todo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todoListClient';
  isMobile!: boolean;
  constructor(private todoService: TodoService) { }


  ngOnInit(): void {
    this.todoService.isMobile$.subscribe(
      res => {
        this.isMobile = res;
      }
    )
  }


}
