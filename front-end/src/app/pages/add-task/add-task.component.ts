import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { response } from 'express';
import { catchError, of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  user$ = this.userService.user$;
  addTaskForm = this.fb.group({
    title: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((response) => {
      if (!response) {
        this.location.back();
      }
    });
  }

  get controls() {
    return this.addTaskForm.controls;
  }

  errorMessage = '';
  succsessMessage = '';
  addTask() {
    this.errorMessage = '';
    this.succsessMessage = '';
    let data = {
      title: this.addTaskForm.get('title')?.value || '',
      deadline: this.addTaskForm.get('deadline')?.value || '',
      priority: this.addTaskForm.get('priority')?.value || '',
      description: this.addTaskForm.get('description')?.value || '',
    };

    this.taskService
      .addTask(data)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;
          this.succsessMessage = '';
          setInterval(() => {
            this.errorMessage = '';
          }, 4000);

          return of();
        })
      )
      .subscribe((response) => {
        this.succsessMessage = 'Task added successfully';
        this.taskService.getTasks();
        this.addTaskForm.reset();

        setInterval(() => {
          this.succsessMessage = '';
        }, 4000);
      });
  }
}
