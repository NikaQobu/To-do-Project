import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  test$ = this.authService.isOpenRegister$;

  constructor(private authService: AuthService) {}

  register() {
    this.authService.isOpenRegister$.next(true);
  }
}
