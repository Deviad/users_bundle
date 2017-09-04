import { Injectable, Inject, Optional } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { NewPasswordAuthService } from "./new-password.auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { IPwCookie } from './IPwCookie.interface';


@Injectable()
export class NewPasswordGuard implements CanActivate  {


  constructor(private authService: NewPasswordAuthService, private router: Router, private route: ActivatedRoute,)
  {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {


    console.log('query params' + JSON.stringify(route.params));
    let hash:string = route.params.hash;
    let userId: number = route.params.userId;
    console.log('query params string' + JSON.stringify(route.params.hash));
    return  this.authService.activate(hash)
        .map(
          (): boolean => {
            console.log('check passed =' + NewPasswordAuthService.isAuthenticated());

            let passwordCookie:IPwCookie = {
              hash: hash,
              userId: userId
            };

            localStorage.setItem('password_hash', JSON.stringify(passwordCookie));
            return NewPasswordAuthService.isAuthenticated();
          },
          (error) => {console.log(error)}
        );
  }

}
