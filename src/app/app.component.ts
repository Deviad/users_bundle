import {Component, ViewEncapsulation} from "@angular/core";

import { HeaderComponent } from "./shared/header.component";

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
