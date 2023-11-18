import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  editTaskForm = this.fb.group({
    title: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private taskService: TaskService
  ) {}

  get controls() {
    return this.editTaskForm.controls;
  }

  errorMessage = '';
  succsessMessage = '';
  editTask() {

  }
   
}
