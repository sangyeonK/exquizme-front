import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/model';
import { QuizSetService } from '../../services/quiz-set.service';

@Component({
  selector: 'app-solve-quiz',
  templateUrl: './solve-quiz.component.html',
  styleUrls: ['./solve-quiz.component.scss']
})
export class SolveQuizComponent implements OnInit {

  constructor(private quizset: QuizSetService) { }

  ngOnInit() {
  }

}
