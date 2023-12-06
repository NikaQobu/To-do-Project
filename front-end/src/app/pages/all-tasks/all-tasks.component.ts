import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.isOpenAllTaskPage$.next(true);
    this.taskService.isOpenActivateTasksPage$.next(false);
    this.taskService.isOpenComplatedTaskPage$.next(false);
    this.taskService.isOpenNotificationTaskPage$.next(false);
    
  }
}
