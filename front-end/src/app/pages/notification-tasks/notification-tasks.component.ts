import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-notification-tasks',
  templateUrl: './notification-tasks.component.html',
  styleUrls: ['./notification-tasks.component.scss']
})
export class NotificationTasksComponent implements OnInit {

  constructor (private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.isOpenAllTaskPage$.next(false);
    this.taskService.isOpenActivateTasksPage$.next(false);
    this.taskService.isOpenComplatedTaskPage$.next(false);
    this.taskService.isOpenNotificationTaskPage$.next(true);
  }

}
