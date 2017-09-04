import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import {HttpClient} from './shared/httpClient.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent }   from './app.component';
import { HeaderComponent } from './shared/header.component';
import { CreateTokenService, UnixTimeStamp, CreateHash } from './shared/create-token.service';
import { AuthGuard } from './shared/auth.guard';
import { AuthFactory, MyLogin, FacebookLogin, GoogleLogin } from './shared/auth.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AlertModule, DatepickerModule, ModalModule } from 'ngx-bootstrap';
import { ForgotComponent } from './unprotected/forgot/forgot.component';
import { SmallModalComponent } from './widgets/small-modal/small-modal.component';
import { NewPasswordComponent } from './protected/newpassword/new-password.component';
import {NewPasswordGuard} from "./protected/newpassword/new-password.guard";
import {NewPasswordAuthService} from './protected/newpassword/new-password.auth.service';
import { APP_CONFIG, AppConfig } from './app.config';
import { CreateCompanyComponent } from './protected/create-company/create-company.component';
export function httpFactory(http) {
  return new AuthHttp(new AuthConfig({
    //            globalHeaders: [{'Content-Type':'application/json'}],
    globalHeaders: [{}],
    noJwtError: true,
  }), http);
}

export function httpClientFactory(http) {
  return  new HttpClient(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    ForgotComponent,
    SmallModalComponent,
    NewPasswordComponent,
    CreateCompanyComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],

  providers: [

    AuthGuard,
    NewPasswordGuard,
    AuthFactory,
    MyLogin,
    FacebookLogin,
    GoogleLogin,
    CreateTokenService,
    { provide: HttpClient, useFactory: httpClientFactory, deps: [Http] },

    {provide: AuthHttp,
      useFactory: httpFactory,
      deps: [Http]
    },
    NewPasswordAuthService,
    {provide: APP_CONFIG, useValue: AppConfig}
    //  {provide: HttpClient, useFactory:(http,router) => new HttpClient(http, router), deps:[AuthHttp, Router]}
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
