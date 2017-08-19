/// <reference types="jquery"/>
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';

interface JQueryX extends JQuery {
  modal(command: any);
}

@Component({
  selector: 'popup-del-quiz',
  templateUrl: './del-quiz.component.html',
  styleUrls: ['./del-quiz.component.scss']
})
export class DelQuizComponent implements OnInit {

  id: string;

  @Output() ok: EventEmitter<object>;

  constructor(private util: UtilService) {
    this.ok = new EventEmitter<object>();
  }

  ngOnInit() {
    this.id = `popup-del-quiz_${this.util.randomString(5)}`;
  }

  open() {
    (<JQueryX>$(`#${this.id}`)).modal({
      onApprove: () => this.delQuiz()
    }).modal("show");

  }

  delQuiz() {
    this.ok.emit();
  }
}
