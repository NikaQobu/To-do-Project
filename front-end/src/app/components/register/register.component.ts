import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage = '';
  registerForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Zა-ჰ]*$/),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Zა-ჰ]*$/),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern(/5[0-9]{8}/),
      ],
    ],
    user: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_ა-ჰ]*$/),
        Validators.maxLength(18),
        Validators.minLength(4),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.maxLength(18), Validators.minLength(8)],
    ],
    confirmPassword: ['', [Validators.required]],
    positions: this.fb.array([this.fb.control('')]),
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {
    // Subscribe to password value changes to update confirmPassword validity
    this.controls['confirmPassword'].setValidators(
      this.confirmPasswordValidator(this.controls['password'])
    );
  }

  openLogin() {
    this.authService.isOpenRegister$.next(false);
    this.authService.isOpenLogin$.next(true);
  }

  register() {
    this.errorMessage = '';
    let data = {
      name: this.registerForm.get('name')?.value || '',
      lastName: this.registerForm.get('lastName')?.value || '',
      phone: this.registerForm.get('phone')?.value || '',
      user: this.registerForm.get('user')?.value || '',
      password: this.registerForm.get('password')?.value || '',
    };

    this.authService
      .register(data)
      .pipe(
        catchError((error) => {
          if (
            error.error.message ==
            'UNIQUE constraint failed: AuthApp_users.user'
          ) {
            this.errorMessage = 'ასეთი მომხმარებელი უკვე არსებობს';
          } else {
            this.errorMessage = error.error.message;
          }

          return of(); // Return an observable to handle the error
        })
      )
      .subscribe(() => {
        this.authService.isOpenLogin$.next(true);
        this.authService.isOpenRegister$.next(false);
      });
  }

  get controls() {
    return this.registerForm.controls;
  }

  get positions() {
    return this.registerForm.controls['positions'];
  }

  confirmPasswordValidator(compareTo: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: 'The password field is empty' };
      }

      if (control.value && control.value !== compareTo.value) {
        return { confirm: 'Passwords do not match' };
      }
      return null;
    };
  }
}
