import {Component, OnInit, ViewChild, OnChanges, Inject} from '@angular/core';
import {HttpClient} from "../../shared/httpClient.service";
import {SmallModalComponent} from "../../widgets/small-modal/small-modal.component";
import { Response } from '@angular/http';
import {APP_CONFIG} from "../../app.config";
import { IAppConfig } from "../../app-config.interface";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit, OnChanges {
  @ViewChild('childModal') childModal: SmallModalComponent;
  viewMyModal = false;

  /*
   * The information hereby is displayed in the modal.
   * The default is ''. Then, according to the res.status the properties are populated accordingly.
   * */

  title = '';
  message = '';

  successTitle = "success";
  errorTitle = "error";

  successMessage = "An email has been sent to the given email address";
  errorMessage = "An error has occurred";
  emailNotFound = "The email address introduced was not found";


  email = '';

  path: string = '/api/password_reset';
  endpoint: string;

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.endpoint = config.apiEndpoint + this.path;
  }

  ngOnInit() {
  }
  ngOnChanges(val)   {
    this.viewMyModal = val;
    console.log('now viewModal is ' + this.viewMyModal);
  }
  isNotEmail(email: string): boolean {
    if(!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      return true;
  }
  sendPassword(email) {
    this.httpClient.post(
      this.endpoint,
      {email: email},
    )
      .subscribe(
        (res: Response) => {
          console.log(res.status);
          if (res.status == 201) {
            /* I want to make capitalize only the first letter of the title when I show the popup,
            *  this since I prefer to have lowercase letters in the HTML DOM.
            * */
            this.title = this.successTitle.charAt(0).toUpperCase() + this.successTitle.slice(1);
            this.message = this.successMessage.charAt(0).toUpperCase() + this.successMessage.slice(1);
            this.viewMyModal = true;

          }},
        (error: Response) => {

          console.log(error);
          this.title = this.errorTitle;
          this.message = this.errorMessage;
          if (error.status == 400) {
            this.title = this.errorTitle;
            this.message = this.emailNotFound;
          }
          this.viewMyModal = true;
        }
      );
  }

}
