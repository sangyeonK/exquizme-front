/// <reference types="jquery"/>
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface JQueryX extends JQuery {
  modal(command: any);
}

@Component({
  selector: 'popup-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  @Output() ok: EventEmitter<object>;
  quizType: number;
  constructor() {
    this.ok = new EventEmitter<object>();
    this.quizType = 0;
  }

  ngOnInit() {

  }

  open() {
    (<JQueryX>$("#popup-add-quiz")).modal({
      onApprove: () => this.addQuiz()
    }).modal("show");
  }

  addQuiz() {
    this.ok.emit({ });
  }

}