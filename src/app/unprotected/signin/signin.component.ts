import {Component, Injectable} from '@angular/core';

import {AuthService, AuthFactory} from '../../shared/auth.service';
import {IUser} from '../../shared/user.interface';
import {ILoginData} from "../../shared/login-data.interface";
export let loginTypeProperty: string;
/*
 * We do not need a complete Form Control in this case as it's a simple form,
 * so we can avoid overloading the component with unneeded libraries.
 */
@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})


@Injectable()
export class SigninComponent {

  constructor(private authFactory: AuthFactory) {
  }

  private user = {
    email: '',
    password: ''
  };

  isNotEmail(email: string): boolean {
    if(!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    return true;
  }

  invalid(email: string, password: string): boolean {
    if (email == '' || password == '')
      return true;

  }

  onSignin(loginType:string, user?:IUser ) {
    loginTypeProperty = loginType;
    this.authFactory.create(loginType, user);
  }

}
