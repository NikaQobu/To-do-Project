import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { AllTasksComponent } from './pages/all-tasks/all-tasks.component';
import { ActiveTasksComponent } from './pages/active-tasks/active-tasks.component';
import { CompletedTasksComponent } from './pages/completed-tasks/completed-tasks.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { TaskComponent } from './components/task/task.component';
import { ErrorComponent } from './pages/error/error.component';
import { FilterbypriorityPipe } from './pipes/filterbypriority.pipe';
import { NotificationTasksComponent } from './pages/notification-tasks/notification-tasks.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ContactComponent,
    HomeComponent,
    AllTasksComponent,
    ActiveTasksComponent,
    CompletedTasksComponent,
    ProfileComponent,
    AddTaskComponent,
    ChangePasswordComponent,
    EditTaskComponent,
    TaskComponent,
    ErrorComponent,
    FilterbypriorityPipe,
    NotificationTasksComponent,
    RecoveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
