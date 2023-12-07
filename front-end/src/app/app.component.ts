import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOpenlogin$ = this.authService.isOpenLogin$;
  isOpenRegister$ = this.authService.isOpenRegister$;
  isOpenRecovery$ = this.authService.isOpenRecovery$

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    // Access the target element that triggered the click event
    let clickedElement = event.target as HTMLElement;
    // Access the parent element of the clicked element

    if (
      (!clickedElement.closest('.move-container') &&
        !clickedElement.closest('.header') &&
        !clickedElement.closest('.join-btn')) ||
      clickedElement.classList.contains('move-container')
    ) {
      this.authService.isOpenRegister$.next(false);
      this.authService.isOpenLogin$.next(false);
      this.authService.isOpenRecovery$.next(false);
    }
  }

  ngOnInit(): void {
    this.userService.init();
  }
}
