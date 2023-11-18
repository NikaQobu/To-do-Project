import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SendLoginRequest, SendRegisterRequest } from '../int/requestsint';
import { Urls } from '../env/urls';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isOpenLogin$ = new BehaviorSubject<boolean>(false);
  isOpenRegister$ = new BehaviorSubject<boolean>(false);
  baseUrl = new Urls().base;

  constructor(
    private http: HttpClient,
    router: Router,
    private userService: UserService
  ) {}

  getHeaderTokenFromCooki() {
    return new HttpHeaders({
      'X-CSRFToken': document.cookie.split('=')[1],
    });
  }

  register(data: SendRegisterRequest) {
    //console.log(document.cookie.split("=")[1])
    return this.http.post<any>(`${this.baseUrl}/register`, data, {
      withCredentials: true,
      headers: this.getHeaderTokenFromCooki(),
    });
  }

  login(data: SendLoginRequest) {
    return this.http.post<any>(`${this.baseUrl}/login`, data, {
      withCredentials: true,
      headers: this.getHeaderTokenFromCooki(),
    });
  }

  logout() {
    let user = '';
    this.userService.user$.pipe().subscribe((response) => {
      user = response.user;
    });
    console.log(user);
    let data = {
      user: user,
    };
    return this.http.post<any>(`${this.baseUrl}/logout`, data, {
      withCredentials: true,
      headers: this.getHeaderTokenFromCooki(),
    });
  }
}
