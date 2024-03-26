import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginPageGuard } from './shared/guard/login-page.guard';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'basic-info', pathMatch: 'full' },
    { path: 'basic-info', component: BasicInfoComponent },
    { path: 'more-info', component: MoreInfoComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
