import { Injectable, Inject, Optional } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService, MyLogin, FacebookLogin, GoogleLogin } from "./auth.service";


@Injectable()

export class AuthGuard implements CanActivate  {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    // return this.typeSelector(SigninComponent.loginTypeProperty);
    let isLogged: boolean = AuthService.loggedIn;
    window.alert('isLogged =' + isLogged);
    return isLogged;
  }
}
