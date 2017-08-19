import { Component, OnInit, Input } from '@angular/core';
import { Quiz, QuizType } from '../../models/model';

@Component({
  selector: 'tag-quiztype',
  templateUrl: './tag-quiztype.component.html',
  styleUrls: ['./tag-quiztype.component.scss']
})
export class TagQuiztypeComponent implements OnInit {
  eQuizType = QuizType;

  @Input('quiz-type') quizType: QuizType;

  constructor() { }

  ngOnInit() {

  }

}
