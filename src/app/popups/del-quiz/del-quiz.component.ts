/// <reference types="jquery"/>
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Quiz } from "../../pages/select-quiz/model";

interface JQueryX extends JQuery {
  modal(command: object);
}

@Component({
  selector: 'popup-del-quiz',
  templateUrl: './del-quiz.component.html',
  styleUrls: ['./del-quiz.component.scss']
})
export class DelQuizComponent implements OnInit {

  selectedQuizzes: Quiz[];

  @Output() ok: EventEmitter<object>;
  constructor() {
    this.ok = new EventEmitter<object>();
  }

  ngOnInit() {
  }

  open(quizzes: Quiz[]) {
    this.selectedQuizzes = quizzes.filter((elem) => elem.checked);

    (<JQueryX>$("#popup-del-quiz")).modal({
      onApprove: () => this.delQuiz()
    }).modal("show");

  }

  delQuiz() {

  }
}
