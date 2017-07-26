import { Component, OnInit } from '@angular/core';
import { Quiz } from './model';

@Component({
  selector: 'app-select-quiz',
  templateUrl: './select-quiz.component.html',
  styleUrls: ['./select-quiz.component.scss']
})
export class SelectQuizComponent implements OnInit {

  quizzes : Quiz[];

  constructor() { 
    this.quizzes = [];
    // TEST DATA
    this.quizzes.push(new Quiz(-1, "탕탕탕 FINGERTIP 네 맘을 겨눌게~"));
    this.quizzes.push(new Quiz(-1, "탕탕탕 FINGERTIP 심장이 멈추게~"));
    //...
  }

  ngOnInit() {
  }

}
