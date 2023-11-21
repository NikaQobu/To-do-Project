import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
})
export class CompletedTasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.isOpenAllTaskPage$.next(false);
    this.taskService.isOpenActivateTasksPage$.next(false);
    this.taskService.isOpenComplatedTaskPage$.next(false);
  }
}
