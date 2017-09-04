import {Inject, Injectable, Optional} from '@angular/core';
import 'rxjs/Rx';
import {Response} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '../../shared/httpClient.service';
import {Observable, Subscribable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {APP_CONFIG} from "../../app.config";
import { IAppConfig } from "../../app-config.interface";
@Injectable()
export class NewPasswordAuthService {

  private path: string = '/api/password_reset/';

  private static isAuthorized: boolean = false;

  static isAuthenticated(): boolean {
    return NewPasswordAuthService.isAuthorized;
  }

  static setAuthenticated(val:boolean): void {
    NewPasswordAuthService.isAuthorized = val;
  }



  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {
    NewPasswordAuthService.isAuthorized = !!localStorage.getItem('auth_token');

  }

  /*
    I use the map() operator in this function because subscribe() cannot return
    a subscribable whereas map can.
   */

  activate(hash:string): Observable<boolean> {

    let endpoint = this.config.apiEndpoint + this.path + hash;

    return  this.httpClient.get(
      endpoint
    )
      .map((res: Response) => {
          console.log('NewPasswordAuthService' + JSON.stringify(res));
          if (res.status == 200) {
            // let body = res.json();
           return NewPasswordAuthService.isAuthorized = true;
          }},
        (error: Response) => {console.log(error);}
      );
  }


  decativate() {

  }

}
