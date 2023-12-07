import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent {
  errorMessage = '';
  recoveryForm = this.fb.group({
    user: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  openLogin() {
    this.authService.isOpenRegister$.next(false);
    this.authService.isOpenLogin$.next(true);
    this.authService.isOpenRecovery$.next(false);
  }

  send() {
    this.errorMessage = '';
    let data = {
      user: this.recoveryForm.get('user')?.value || '',
      phone: this.recoveryForm.get('phone')?.value || '',
    };
    this.authService
      .recovery(data)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;

          return of();
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.openLogin();
      });
  }

  openRegister() {
    this.authService.isOpenRegister$.next(true);
    this.authService.isOpenLogin$.next(false);
    this.authService.isOpenRecovery$.next(false);
  }
}
