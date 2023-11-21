import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  loginForm = this.fb.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {}

  openRegister() {
    this.authService.isOpenRegister$.next(true);
    this.authService.isOpenLogin$.next(false);
  }

  login() {
    let data = {
      user: this.loginForm.get('user')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    };

    this.authService
      .login(data)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;

          return of();
        })
      )
      .subscribe((response) => {
        if (response.user_info) {
          const userInfo = response.user_info;
          const userToken = response.csrf_token;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          localStorage.setItem('token', JSON.stringify(userToken));
          this.authService.isOpenLogin$.next(false);
          this.router.navigate(['/home']);
          this.userService.init();
          this.taskService.getTasks();
        }
      });
  }
}
