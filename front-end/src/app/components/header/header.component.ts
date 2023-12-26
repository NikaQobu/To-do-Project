import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  errorMessage = '';
  user$ = this.userService.user$;
  iconMenuContent: boolean = false;
  iconAuthContent: boolean = false;
  profileImg$ = this.userService.userProfileImg$;
  notificationsCount$ = this.taskService.notificationsCount$;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((response) => {
      this.userService
        .getProfileImg(response.user)
        .pipe()
        .subscribe((response) => {
          this.userService.userProfileImg$.next(
            `http://127.0.0.1:8000${response.userImage}`
          );
        });
    });
  }

  openRegister() {
    this.authService.isOpenRegister$.next(true);
    this.authService.isOpenLogin$.next(false);
    this.authService.isOpenRecovery$.next(false);
  }
  openLogin() {
    this.authService.isOpenRegister$.next(false);
    this.authService.isOpenLogin$.next(true);
    this.authService.isOpenRecovery$.next(false);
  }

  logout() {
    this.errorMessage = '';
    this.authService
      .logout()
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;

          return of();
        })
      )
      .subscribe(() => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        this.userService.init();
      });
  }

  changeIconMenuContentStatus() {
    this.iconMenuContent = !this.iconMenuContent;
  }
  changeIconAuthContentStatus() {
    this.iconAuthContent = !this.iconAuthContent;
  }
}
