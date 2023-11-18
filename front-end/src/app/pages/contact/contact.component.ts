import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { response } from 'express';
import { catchError, of } from 'rxjs';
import { AllService } from 'src/app/services/all.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  statusSendMessage = false;
  errorMessage = '';
  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(2),
        Validators.pattern(/^[A-z]/),
      ],
    ],
    message: [
      '',
      [Validators.required, Validators.max(300), Validators.minLength(5)],
    ],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private allService: AllService
  ) {}

  get controls() {
    return this.contactForm.controls;
  }

  sendEmail() {
    this.errorMessage = "";
    let data = {
      name: this.contactForm.get('name')?.value || '',
      email: this.contactForm.get('email')?.value || '',
      message: this.contactForm.get('message')?.value || '',
    };

    this.allService
      .sendEmail(data)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;
          return of(); 
        })
      )
      .subscribe(() => {
        this.statusSendMessage = true;
      });
  }

  updatestatusSendMessage() {
    this.statusSendMessage = false;
    this.contactForm.reset();
  }
}
