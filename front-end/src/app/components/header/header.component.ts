import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  profileImg = '';
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((response) => {
      this.userService
        .getProfileImg(response.user)
        .pipe()
        .subscribe((response) => {
          this.profileImg = `http://127.0.0.1:8000${response.userImage}`;
        });
    });
  }

  openRegister() {
    this.authService.isOpenRegister$.next(true);
    this.authService.isOpenLogin$.next(false);
  }
  openLogin() {
    this.authService.isOpenRegister$.next(false);
    this.authService.isOpenLogin$.next(true);
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
        this.router.navigate(['/home']);
      });
  }

  changeIconMenuContentStatus() {
    console.log('ki');
    this.iconMenuContent = !this.iconMenuContent;
  }
}
