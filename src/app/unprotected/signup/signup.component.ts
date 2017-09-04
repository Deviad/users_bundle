import {Component, Inject, OnInit} from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { MyLogin } from "../../shared/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpModule, Http, Headers, RequestOptions, Response} from '@angular/http';
import {HttpClient} from '../../shared/httpClient.service';
import {IAppConfig} from "../../app-config.interface";
import {APP_CONFIG} from "../../app.config";
import {CreateTokenService} from "../../shared/create-token.service";
import {IUser} from "../../shared/user.interface";
import {ILoginData} from "../../shared/login-data.interface";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  private path: string = '/api/user';
  private endpoint: string;

  user = {
    email: '',
    password: ''
  };

  passwordStrength = 'weak';

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: Http, private httpClient: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig, private mylogin: MyLogin) {
  this.endpoint = config.apiEndpoint + this.path;
  }

  ngOnInit(): any {
    this.buildForm();
  }

  buildForm(): void {
    this.signupForm = this.fb.group({

      email: [this.user.email, Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        this.isPassword
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
      ])],
    });

    // this.signupForm.statusChanges.subscribe(data => {
    //   console.log('Form changes', data)
    //  // this.signupForm.updateValueAndValidity();
    // });
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return {noEmail: true};
    }
  }

  isPassword(control: FormControl) {
    // if (!control.value.match(/((?=\S*[A-Z])(?=\S*[a-z])(?=\S*\d)\S{6,})/)) {
    //   return {noPassword: true};
    // }

    if (!control.value.match(/((?=\S*[A-Z]))/)) {
      return {missingUpperCase: true}
    }
    if (!control.value.match(/((?=\S*[a-z]))/)) {
        return {missingLowerCase: true}
    }
    if (!control.value.match(/((?=\S*[0-9]))/)) {
      return {missingDigit: true}
    }
    if (control.value.length < 6) {
      return {tooShortPassword: true}
    }
    // if (!control.value.match(/((?=\S*[A-Z])(?=\S*[a-z])(?=\S*\d)\S{6,})/)) {
    //     return {noPassword: true};
    // }
  }

  passwordStrengthCalculator($event, password:string): void {
    this.passwordStrength = 'weak';

    if (password.match(/((?=\S*[A-Z])(?=\S*[a-z])(?=\S*[0-9]))/) && password.length >= 6) {
      this.passwordStrength = 'strong';
    }
    if (password.match(/((?=\S*[A-Z])(?=\S*[a-z])(?=\S*[0-9]))/) && password.length < 6) {
      this.passwordStrength = 'medium';
    }

  }

  resetConfirmPassword(password:string, confirmPassword: FormControl) : void {

    if (password != confirmPassword.value) {
      confirmPassword.setErrors({"passwordsNotMatch": true});
    }
    else {
      confirmPassword.setErrors(null);
    }
  }

  submitForm(value: any){
    console.log(value);
    var email = value.email;
    var password = value.password;
    this.httpClient.post(
      this.endpoint,
      {email: email, password: password, password2: password},
    )
      .subscribe((res: Response) => {
        console.log('My Wonderful Response ' + res);
        if (res.status == 201) {
          let body = res.json();

          let data: ILoginData = {
            loginP: 'my',
            hashed: '',
            user: {
              email: email,
              password: password
            },
            accessFlow: 'signup'
          };

          this.login(data);
          // this.router.navigate(['protected'], { relativeTo: this.route });

        }},
        (error) => {console.log(error);}
      );

  }

  login (loginData: ILoginData) {
    this.mylogin.signinUser(loginData);

  }
}
