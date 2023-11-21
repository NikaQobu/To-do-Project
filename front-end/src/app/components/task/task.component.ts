import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

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

  constructor(private taskService: TaskService) {
    this.activateTasks$.subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.taskService.getTasks();
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
    console.log(taskID);
  }
  activateTask(taskID: number) {
    console.log(taskID);
  }
  complateTask(taskid: number, status:string) {
    let data = {
      taskid: taskid,
      status: status
    }
    this.taskService.changeTaskStatus(data).pipe().subscribe((response)=> {
      console.log(response)
    })
    
  }
}
