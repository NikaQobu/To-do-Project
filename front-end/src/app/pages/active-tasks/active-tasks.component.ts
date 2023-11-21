import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.scss'],
})
export class ActiveTasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.isOpenAllTaskPage$.next(false);
    this.taskService.isOpenActivateTasksPage$.next(true);
    this.taskService.isOpenComplatedTaskPage$.next(false);
  }
}
