import { NgModule, ViewChildren } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './account/profile/profile.component';
import { SettingsComponent } from './account/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { MatchesComponent } from './matches/matches.component';
import { AuthGuard } from './middleware/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'matches', component: MatchesComponent, canActivate: [AuthGuard]},
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard]},
  { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'account/settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
