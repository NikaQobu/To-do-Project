import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SendEmail } from '../int/requestsint';
import { Urls } from '../env/urls';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AllService {
  baseUrls = new Urls().base;
  constructor(private http: HttpClient, private router: Router) {}

  sendEmail(data: SendEmail) {
    return this.http.post<any>(`${this.baseUrls}/send_email`, data, {
      withCredentials: true,
      headers: new HttpHeaders({
        'X-CSRFToken': document.cookie.split('=')[1],
      }),
    });
  }
}
