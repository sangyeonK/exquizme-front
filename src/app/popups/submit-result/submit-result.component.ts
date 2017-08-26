import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UtilService } from '../../services/util.service';

interface JQueryX extends JQuery {
  modal(command: any);
}

@Component({
  selector: 'popup-submit-result',
  templateUrl: './submit-result.component.html',
  styleUrls: ['./submit-result.component.scss']
})
export class SubmitResultComponent implements OnInit {

  id: string;

  @ViewChild("nickname") nickname: ElementRef;

  @Output() ok: EventEmitter<string>;

  constructor(private util: UtilService) {
    this.ok = new EventEmitter<string>();
  }

  ngOnInit() {
    this.id = `popup-submit-result_${this.util.randomString(5)}`;
  }

  open() {
    (<JQueryX>$(`#${this.id}`)).modal({
      onApprove: () => this.submitResult()
    }).modal("show");
  }

  submitResult() {
    this.ok.emit((this.nickname.nativeElement as HTMLInputElement).value);
  }


}
