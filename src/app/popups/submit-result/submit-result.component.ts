import { Component, OnInit } from '@angular/core';
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

  constructor(private util:UtilService) { }

  ngOnInit() {
    this.id = `popup-share-quiz-complete_${this.util.randomString(5)}`;
  }

  open() {
    
    (<JQueryX>$(`#${this.id}`)).modal({

    }).modal("show");

  }

}
