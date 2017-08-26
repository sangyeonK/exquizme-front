import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';

interface JQueryX extends JQuery {
  modal(command: any);
}

@Component({
  selector: 'popup-share-quiz-complete',
  templateUrl: './share-quiz-complete.component.html',
  styleUrls: ['./share-quiz-complete.component.scss']
})
export class ShareQuizCompleteComponent implements OnInit {

  id: string;
  url:string;
  title: string;

  @Output() ok: EventEmitter<string>;

  constructor(private util:UtilService) { }

  ngOnInit() {
    this.id = `popup-share-quiz-complete_${this.util.randomString(5)}`;
  }

  open(quizsetId:string, title:string) {
    this.title = title;
    this.url = `http://exquiz.me/start_solve_quiz?quizeset_id=${quizsetId}`;

    (<JQueryX>$(`#${this.id}`)).modal({

    }).modal("show");

  }
}
