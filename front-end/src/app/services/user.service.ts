import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ChaneProfileInfo,
  ChangePassword,
  CheckProfileInfo,
  UploadProfileImg,
} from '../int/requestsint';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../env/urls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = new Urls().base;
  user$ = new BehaviorSubject<any>(null);
  userProfileImg$ = new BehaviorSubject<any>(null);
  verifyPassword = '';

  constructor(private http: HttpClient) {}

  changePassword(data: ChangePassword) {
    this.user$.pipe().subscribe((response) => {
      data.user = response.user;
    });
    return this.http.post<any>(`${this.baseUrl}/change_password`, data, {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    });
  }
  checkProfileInfo(data: CheckProfileInfo) {
    return this.http.post<any>(`${this.baseUrl}/check_profile_info`, data, {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    });
  }
  changeProfileInfo(data: ChaneProfileInfo) {
    data.password = this.verifyPassword;
    return this.http.post<any>(`${this.baseUrl}/change_profile_info`, data, {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    });
  }

  getProfileImg(user: string) {
    return this.http
      .get<any>(`${this.baseUrl}/get_profile_image/${user}`, {
        withCredentials: true,
        headers: new HttpHeaders({
          'X-CSRFToken': document.cookie.split('=')[1],
        }),
      })
  }

  uploadProfileImg(formData: FormData) {
    return this.http.post<any>(`${this.baseUrl}/upload_profile_img`, formData, {
      reportProgress: true,
      observe: 'events',
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    });
  }

  init() {
    let user = localStorage.getItem('userInfo');
    if (user) {
      this.user$.next(JSON.parse(user));
    } else {
      this.user$.next(null);
    }
  }
}
