import {Inject, Injectable, Optional} from '@angular/core';
import {CreateTokenService} from './create-token.service';
import {UnixTimeStamp} from './create-token.service';
import 'rxjs/Rx';
import {HttpModule, Http, Headers, RequestOptions, Response} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {SigninComponent} from '../unprotected/signin/signin.component';
import {IUser} from './user.interface';
import {APP_CONFIG} from "app/app.config";
import {IAppConfig} from "../app-config.interface";
import {HttpClient} from "./httpClient.service";
import {ILoginData} from "./login-data.interface";

@Injectable()
export abstract class AuthService {

  static loggedIn: boolean = false;
  static isAuthenticated(): boolean {
    return AuthService.loggedIn;
  }
  abstract logout(): any;

  abstract signinUser(data?: object): any;


}


@Injectable()
export class MyLogin extends AuthService {
  options: RequestOptions;
  headers: Headers;
  path: string = '/auth';
  endpoint: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,  @Inject(APP_CONFIG) private config: IAppConfig) {
    super();
    AuthService.loggedIn = !!localStorage.getItem('auth_token');
    this.endpoint = config.apiEndpoint + this.path;
  }

  signinUser(data: ILoginData) {
    console.log(data);
    // alert('Email is' + myData.user.email + '. \n Password is ' + myData.user.password);
    window.alert('mydata is ' + JSON.stringify(data));
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
    let tokenHolder = new CreateTokenService(JSON.stringify(data));
   // let now = new UnixTimeStamp();
    // let queryString = 'http://login.myloginonline.com/api/getloggedinuser?timestamp=';
    // let theUrl = queryString + now.unixTimeStamp + '&hash=' + tokenHolder.token.hashed;

    /* There are two flows to access the application:
       1) Business owner who wants to create a new company;
       2) Employee that received an invite to join his company within the app.
     */

    let accessFlow = data.accessFlow == 'signup' ? 'signup' : 'invited';
    let theUrl = this.endpoint;
    let email = data.user.email;
    let password = data.user.password;
    this.http.post(
      theUrl,
      {username: email, password: password},
    )
      .map((res: Response) => {
      console.log(res.status);
        if (res.status == 200) {
          let body = res.json();

          tokenHolder.hashed = body.access_token;

          localStorage.setItem('auth_token', JSON.stringify(tokenHolder));
          AuthService.loggedIn = true;
          if (accessFlow == 'invited'){
            this.router.navigate(['protected'], { relativeTo: this.route });
          }
          else {
            this.router.navigate(['create-company'], { relativeTo: this.route });
          }
        }
      })
      .subscribe(
        () => {},
        (error) => {console.log(error);}
      );
  }


  logout(): any {

    window.alert("EXIT!");
    localStorage.removeItem('auth_token');
    AuthService.loggedIn = false;
    this.router.navigate(['/signin']);
  };

}


@Injectable()
export class FacebookLogin extends AuthService {
  signinUser() {
    window.alert('Facebook Login');
  }

  logout() {
    window.alert('Facebook Logout');
  }
}


@Injectable()
export class GoogleLogin extends AuthService {
  signinUser() {
    window.alert('Google Login');
  }

  logout() {
    window.alert('Google Logout')
  }
}


@Injectable()
export  class AuthFactory {
  myLogin: MyLogin;
  facebookLogin: FacebookLogin;
  googleLogin: GoogleLogin;

  constructor (private router: Router, private route: ActivatedRoute, private http: Http, @Optional() myLogin: MyLogin, @Optional() facebookLogin: FacebookLogin, @Optional() googleLogin: GoogleLogin) {


    this.myLogin = myLogin;
    this.facebookLogin = facebookLogin;
    this.googleLogin = googleLogin;

  }


  create( loginType: string, user?:IUser) {
    window.alert("minchia" + JSON.stringify(loginType));
    loginType = loginType.toLocaleLowerCase();

    let secretKey = '1234abcd';
    let myData = {
      loginP: loginType,
      secretKey: secretKey,
      user: user
    };
    let sendData = ((loginType, myData) => {return (loginType == 'my') ? myData : ''});
    window.alert('sendDatais' + myData);
    window.alert('mydata issdadsaa ' + JSON.stringify(myData));
    return this[loginType + 'Login'].signinUser(sendData(loginType, myData));
  }

}

