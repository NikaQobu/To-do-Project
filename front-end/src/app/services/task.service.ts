import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddTask, ChangeTaskTatus, EditTaskInformation } from '../int/requestsint';
import { UserService } from './user.service';
import { Urls } from '../env/urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = new Urls().base;
  activateTasks$ = new BehaviorSubject<any>(null);
  complatedTasks$ = new BehaviorSubject<any>(null);
  isOpenActivateTasksPage$ = new BehaviorSubject<any>(false);
  isOpenComplatedTaskPage$ = new BehaviorSubject<any>(false);
  isOpenAllTaskPage$ = new BehaviorSubject<any>(false);
 
  constructor(private http: HttpClient, private userService: UserService) {}

  addTask(data: AddTask) {
    this.userService.user$.pipe().subscribe((response) => {
      data.user = response.user;
    });

    return this.http.post<any>(`${this.baseUrl}/add_task`, data, {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    });
  }

  getTasks() {
    let user = '';
    this.userService.user$.pipe().subscribe((response) => {
      user = response.user;
    });
    this.http
      .get<any>(`${this.baseUrl}/get_tasks/${user}`, {
        withCredentials: true,
        headers: new HttpHeaders({
          'X-CSRFToken': document.cookie.split('=')[1],
        }),
      })
      .subscribe((response) => {
        this.activateTasks$.next(response.active_tasks);
        this.complatedTasks$.next(response.complated_tasks);

      

        
      });
  }
  deleteTask(id:number){
    return this.http
      .get<any>(`${this.baseUrl}/delete_task/${id}`, {
        withCredentials: true,
        headers: new HttpHeaders({
          'X-CSRFToken': document.cookie.split('=')[1],
        }),
      })
  }
  changeTaskStatus(data:ChangeTaskTatus){
    return this.http
    .post<any>(`${this.baseUrl}/change_task_status`, data,{
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    })
  }
  getTask(id: number){
    return this.http
    .get<any>(`${this.baseUrl}/get_task/${id}`, {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    })

  }

  editTaskInformation(info:EditTaskInformation){
    return this.http
      .post<any>(`${this.baseUrl}/edit_task`, info, {
        withCredentials: true,
        headers: new HttpHeaders({
          'X-CSRFToken': document.cookie.split('=')[1],
        }),
      })
  }
}
