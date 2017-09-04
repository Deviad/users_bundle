import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";
import {HttpClient} from "../../shared/httpClient.service";
import {IAppConfig} from "../../app-config.interface";
import {APP_CONFIG} from "../../app.config";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  createCompany: FormGroup;

  private path: string = '/api/company';
  private endpoint: string;

  user = {
    email: '',
    password: ''
  };

  passwordStrength = 'weak';

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: Http, private httpClient: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.endpoint = config.apiEndpoint + this.path;
  }

  ngOnInit(): any {
    this.buildForm();
  }

  buildForm(): void {
    this.createCompany = this.fb.group({
      companyName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2)
      ])],
      email: [this.user.email, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        this.isEmail
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




  submitForm(value: any) {
    console.log(value);

    let email = value.email;
    let password = value.password;
    this.httpClient.post(
      this.endpoint,
      {email: email, password: password, password2: password},
    )
      .subscribe((res) => {
          console.log(res.status);
          if (res.status == 200) {
            let body = res.json();

            this.router.navigate(['protected'], { relativeTo: this.route });

          }},
        (error) => {console.log(error);}
      );

  }

}
