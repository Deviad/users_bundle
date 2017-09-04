import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import 'rxjs/Rx';
@Component({
  selector: 'app-small-modal',
  templateUrl: './small-modal.component.html',
  styleUrls: ['./small-modal.component.scss']
})
export class SmallModalComponent implements AfterViewInit{
  @ViewChild('childModal') public childModal:ModalDirective;


  @Input() title: string = '';
  @Input() message: string = '';
  @Output() viewModal: EventEmitter<boolean> =  new EventEmitter<boolean>();


  ngAfterViewInit() {
    this.showModal();

    /* Using a mix of old JS in order to launch an event listener which listens for a click event
     * on the shadow area of the modal and emits an EventEmitter<boolean> equal to false.
     * This way we reset the status of the modal.
     * <app-small-modal *ngIf="viewMyModal" (viewModal)="ngOnChanges($event)" [title]="title" [message]="message"></app-small-modal>
     * viewMyModal == false, therefore it gets deleted from the dom once the user clicks on the shadow.
     */

    let shadow = document.getElementById(`${this.title}-modal`);
    let that = this;
    shadow.addEventListener("click", function () {
      that.viewModal.emit(false);
    });
  }

  resetModal () {
    this.viewModal.emit(false);
  }
  public showModal():void {
    this.childModal.show();
  }

  public hideModal():void {
    this.childModal.hide();
  }
}





