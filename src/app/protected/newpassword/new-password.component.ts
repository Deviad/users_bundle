import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "../../shared/httpClient.service";
import {IPwCookie} from './IPwCookie.interface';
import {Response} from '@angular/http'
import {MyLogin} from "../../shared/auth.service";
import { IUser } from '../../shared/user.interface';
import {APP_CONFIG} from "../../app.config";
import { IAppConfig } from "../../app-config.interface";
import {ILoginData} from "../../shared/login-data.interface";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})



  export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;

  private pwCookie: IPwCookie = JSON.parse(localStorage.getItem('password_hash'));

  private path: string = `/api/user/${this.pwCookie.userId}`;

  private user: IUser = {
    email: '',
    password: ''
  };

  passwordStrength = 'weak';
  private endpoint: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private authService: MyLogin, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.endpoint = config.apiEndpoint + this.path;
    console.log('my endpoint is + ' + this.endpoint);
  }

  ngOnInit(): any {
    this.buildForm();
    console.log('our great pw hash is ' + this.pwCookie);
  }

  buildForm(): void {
    this.newPasswordForm = this.fb.group({

      password: ['', Validators.compose([
        Validators.required,
        this.isPassword
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
      ])],
    });

    // this.newPasswordForm.statusChanges.subscribe(data => {
    //   console.log('Form changes', data)
    //  // this.newPasswordForm.updateValueAndValidity();
    // });
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

    let password = value.password;
    this.httpClient.patch(
      this.endpoint,
      {
        hash: this.pwCookie.hash,
        password: password,
        password2: password
      },
    )
      .subscribe((res: Response) => {
          console.log(res);
          if (res.status == 200) {
            let body = res.json();
            let email = body.email;

            let data: ILoginData = {
              loginP: 'my',
              hashed: '',
              user: {
                email: email,
                password: password
              }
              };

            this.authService.signinUser(data);


            // this.router.navigate(['protected'], { relativeTo: this.route });

          }},
        (error) => {console.log(error);}
      );

  }
}
