import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  user$ = this.userService.user$;
  errorMessage = '';
  succsessMessage = '';
  changePasswordData = this.fb.group({
    positions: this.fb.array([this.fb.control('')]),
    oldPassword: ['', [Validators.required]],
    newPassword: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(18)],
    ],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {
    this.controls['confirmPassword'].setValidators(
      this.confirmPasswordValidator(this.controls['newPassword'])
    );
  }

  ngOnInit(): void {
    this.user$.subscribe((response) => {
      if (!response) {
        this.location.back();
      }
    });
  }

  get controls() {
    return this.changePasswordData.controls;
  }

  get positions() {
    return this.changePasswordData.controls['positions'];
  }

  changePassword() {
    this.errorMessage = '';
    this.succsessMessage = '';
    let data = {
      currentPassword: this.changePasswordData.get('oldPassword')?.value || '',
      newPassword: this.changePasswordData.get('newPassword')?.value || '',
      user: '',
    };
    this.userService
      .changePassword(data)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;
          this.succsessMessage = '';
          setInterval(() => {
            this.errorMessage = '';
          }, 4000);
          return of(); // Return an observable to handle the error
        })
      )
      .subscribe(() => {
        this.succsessMessage = 'Password Changed Successfully';
        this.changePasswordData.reset();
        setInterval(() => {
          this.succsessMessage = '';
        }, 4000);
      });
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
