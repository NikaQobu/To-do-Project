import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { Subscription, catchError, concat, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.userService.user$;
  errorMessage = '';
  succsessMessage = '';
  verifyPassword = '';
  isCorrectUserInfo: boolean = false;

  profileImg = 'http://127.0.0.1:8000/media/default.jpeg';

  startUserInfoData = {
    user: '',
    name: '',
    lastname: '',
    phone: '',
  };

  userInfoData = {
    user: '',
    name: '',
    lastname: '',
    phone: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    let authorization = localStorage.getItem('userInfo');
    if (!authorization) {
      this.router.navigate(['/login']);
    }

    this.user$.subscribe((response) => {
      if (response) {
        this.userInfoData.user = response.user;
        this.startUserInfoData.user = response.user;
        this.userInfoData.name = response.name;
        this.startUserInfoData.name = response.name;
        this.userInfoData.lastname = response.lastname;
        this.startUserInfoData.lastname = response.lastname;
        this.userInfoData.phone = response.phone;
        this.startUserInfoData.phone = response.phone;
      }
    });
    this.user$.subscribe((response) => {
      if (!response) {
        this.location.back();
      }
    });
  }

  checkUserInfo() {
    this.errorMessage = '';
    this.userService
      .checkProfileInfo(this.userInfoData)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;

          return of();
        })
      )
      .subscribe(() => {
        this.isCorrectUserInfo = true;
      });
  }

  changeUserInfo() {
    this.errorMessage = '';
    this.userService.verifyPassword = this.verifyPassword;
    this.isCorrectUserInfo = false;
    this.userService
      .changeProfileInfo(this.userInfoData)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;
          this.succsessMessage = '';
          this.userService.verifyPassword = '';
          setInterval(() => {
            this.errorMessage = '';
          }, 4000);
          return of();
        })
      )
      .subscribe((response) => {
        if (response.user_info) {
          localStorage.removeItem('userInfo');
          localStorage.removeItem('token');
          const userInfo = response.user_info;
          const userToken = response.csrf_token;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          localStorage.setItem('token', JSON.stringify(userToken));
          this.userService.init();
          this.userService.verifyPassword = '';
          this.succsessMessage = 'Informations successfully updated';
          setInterval(() => {
            this.succsessMessage = '';
          }, 4000);
        }
      });
  }
}
