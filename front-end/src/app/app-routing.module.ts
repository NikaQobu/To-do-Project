import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ActiveTasksComponent } from './pages/active-tasks/active-tasks.component';
import { AllTasksComponent } from './pages/all-tasks/all-tasks.component';
import { CompletedTasksComponent } from './pages/completed-tasks/completed-tasks.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'activetasks', component: ActiveTasksComponent },
  { path: 'alltasks', component: AllTasksComponent },
  { path: 'complatedtasks', component: CompletedTasksComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'edittask', component: EditTaskComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
