import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./unprotected/signup/signup.component";
import {SigninComponent} from "./unprotected/signin/signin.component";
import {ForgotComponent} from "./unprotected/forgot/forgot.component";
import {ProtectedComponent} from "./protected/protected.component";
import {AuthGuard} from "./shared/auth.guard";
import {NewPasswordGuard} from "./protected/newpassword/new-password.guard";
import {NewPasswordComponent} from "./protected/newpassword/new-password.component";
import {CreateCompanyComponent} from "./protected/create-company/create-company.component";

const routes: Routes = [
  /* Free routes */
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'forgot', component: ForgotComponent},

  /*Protected routes */
  {path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard]},
  {path: 'create-company', component: CreateCompanyComponent, canActivate: [AuthGuard]},
  {path: 'forgot/:hash/:userId', component:  NewPasswordComponent, canActivate: [NewPasswordGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

export const routingComponents = [SignupComponent, SigninComponent, ProtectedComponent, ForgotComponent, CreateCompanyComponent];
