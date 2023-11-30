import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  taskId = null;
  editTaskForm = this.fb.group({
    title: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe().subscribe((params) => {
      this.taskId = params['id'];
      this.taskService
        .getTask(params['id'])
        .pipe()
        .subscribe((response) => {
          this.editTaskForm.get('title')?.setValue(response.taskInfo.title);
          this.editTaskForm
            .get('deadline')
            ?.setValue(response.taskInfo.deadline);
          this.editTaskForm
            .get('priority')
            ?.setValue(response.taskInfo.priority);
          this.editTaskForm
            .get('description')
            ?.setValue(response.taskInfo.description);
        });
    });
  }

  get controls() {
    return this.editTaskForm.controls;
  }

  errorMessage = '';
  succsessMessage = '';
  editTaskInformation() {
    let info = {
      title: this.editTaskForm.get('title')?.value || '',
      description: this.editTaskForm.get('description')?.value || '',
      deadline: this.editTaskForm.get('deadline')?.value || '',
      priority: this.editTaskForm.get('priority')?.value || '',
      taskId: this.taskId,
    };
    this.taskService
      .editTaskInformation(info)
      .pipe()
      .subscribe((response) => {
        this.location.back();
      });
  }
}
