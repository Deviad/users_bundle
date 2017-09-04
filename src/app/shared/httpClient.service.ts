import {Injectable, Optional} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {IAppToken} from './app-token.interface';
@Injectable()
export class HttpClient {

  token: IAppToken = null;

  constructor(public http: Http) {
    this.token = localStorage.getItem('auth_token') ? JSON.parse(localStorage.getItem('auth_token')) : null;
    console.log('we have a token' + this.token);
  }

  createAuthorizationHeader(headers:Headers) {
    if (!!this.token) {
      headers.append('Authorization', 'Bearer: ' + this.token.hashed);
    }
  }

  get(url:string) {
    let headers: Headers = new Headers();
    if(!!this.token){
      this.createAuthorizationHeader(headers);
    }

    return this.http.get(url, {
      headers: headers
    });
  }

  post(url:string, data:object) {
    let headers: Headers = new Headers();
    if(!!this.token){
      this.createAuthorizationHeader(headers);
    }

    headers.append('Content-Type', 'application/json');

    return this.http.post(url, JSON.stringify(data), {
      headers: headers
    });
  }
  patch(url:string, data:object) {
    let headers: Headers = new Headers();
    if(!!this.token){
      this.createAuthorizationHeader(headers);
    }

    headers.append('Content-Type', 'application/json');

    return this.http.patch(url, JSON.stringify(data), {
      headers: headers
    });
  }
}

