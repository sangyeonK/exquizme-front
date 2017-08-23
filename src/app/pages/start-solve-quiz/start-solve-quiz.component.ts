import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Quiz } from '../../models/model';
import { QuizSetService } from '../../services/quiz-set.service';

@Component({
  selector: 'app-start-solve-quiz',
  templateUrl: './start-solve-quiz.component.html',
  styleUrls: ['./start-solve-quiz.component.scss']
})
export class StartSolveQuizComponent implements OnInit {

  constructor(private router: Router, private quizset: QuizSetService) {
  }

  ngOnInit() {
  }

  gotoSolveQuizPage() {
    let quizset: Quiz[] = [];
    for (let i = 0; i < 10; i++) {
      let quiz: Quiz = new Quiz(0, `${i + 1}번째 퀴즈`);
      quiz.type = 0;
      quiz.answerList = ["1", "2", "3", "4"];
      quiz.correctAnswer = "1";

      quizset.push(quiz);
    }

    this.quizset.set(quizset);
    this.router.navigate(['solve_quiz']);
  }

}
