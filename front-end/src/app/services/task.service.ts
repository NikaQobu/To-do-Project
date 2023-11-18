import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddTask } from '../int/requestsint';
import { UserService } from './user.service';
import { Urls } from '../env/urls';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = new Urls().base;

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
}
