/// <reference types="jquery"/>
import { Component, OnInit } from '@angular/core';
import { Quiz } from './model';

interface JQueryX extends JQuery {
  popup(any: any);
}

@Component({
  selector: 'app-select-quiz',
  templateUrl: './select-quiz.component.html',
  styleUrls: ['./select-quiz.component.scss']
})
export class SelectQuizComponent implements OnInit {

  quizzes: Quiz[];

  constructor() {
    this.quizzes = [];
    // TEST DATA
    this.quizzes.push(new Quiz(-1, "탕탕탕 FINGERTIP 네 맘을 겨눌게~"));
    this.quizzes.push(new Quiz(-1, "탕탕탕 FINGERTIP 심장이 멈추게~"));
    this.quizzes.push(new Quiz(-1, "Shimmie Shimmie Ko Ko Bop"));
    this.quizzes.push(new Quiz(-1, "Shimmie Shimmie Ko Ko Bop"));
    //...
  }

  ngOnInit() {
  }

  quizDetail(event: Event, index: number) {

    let target: Element = event.srcElement;
    if (target) {
      let currentQuiz: Quiz = this.quizzes[index];
      (<JQueryX>$(target.parentElement)).popup({
        title: `${currentQuiz.title.substr(0,15)}...`,
        on: "click"
      });
    }

  }
}
