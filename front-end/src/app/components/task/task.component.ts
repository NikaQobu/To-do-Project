import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  isOpenActivateTasksPage$ = this.taskService.isOpenActivateTasksPage$;
  isOpenComplatedTaskPage$ = this.taskService.isOpenComplatedTaskPage$;
  isOpenAllTaskPage$ = this.taskService.isOpenAllTaskPage$;
  complatedTasks$ = this.taskService.complatedTasks$;
  activateTasks$ = this.taskService.activateTasks$;
  errorMessage = '';

  user$ = this.userService.user$;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {
    this.activateTasks$.subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.taskService.getTasks();
    this.user$.subscribe((response) => {
      if (!response) {
        this.location.back();
      }
    });
  }

  deleteTask(taskID: number) {
    this.errorMessage = '';
    this.taskService
      .deleteTask(taskID)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;

          return of();
        })
      )
      .subscribe((response) => {
        this.taskService.getTasks();
      });
  }
  editTask(taskID: number) {
    this.router.navigate(['/edittask'], { queryParams: { id: taskID } });
  }

  changeTaskStatus(taskid: number, status: string) {
    console.log(status);
    let data = {
      taskid: taskid,
      status: status,
    };
    this.taskService
      .changeTaskStatus(data)
      .pipe()
      .subscribe((response) => {
        this.taskService.getTasks();
      });
  }
}
