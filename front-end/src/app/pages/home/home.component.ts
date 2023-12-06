import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  test$ = this.authService.isOpenRegister$;
  user$ = this.userService.user$;

  constructor(private authService: AuthService, private userService: UserService) {}

  register() {
    this.authService.isOpenRegister$.next(true);
  }
}
