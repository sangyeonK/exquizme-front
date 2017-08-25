import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { Quiz, QuizType } from '../../models/model';
import { QuizSetService } from '../../services/quiz-set.service';


@Component({
  selector: 'app-solve-quiz',
  templateUrl: './solve-quiz.component.html',
  styleUrls: ['./solve-quiz.component.scss']
})
export class SolveQuizComponent implements OnInit {
  eQuizType = QuizType;
  index: number;
  quizzes: Quiz[];
  currentQuiz: Quiz;

  choiceNumber: number;
  chooseNumber: number;
  clearQuiz: boolean;
  isCorrect: boolean;

  //결과
  showResult: boolean;
  playtime: number;
  correctCount: number;
  wrongCount: number;

  @ViewChild("sentenceQuizAnswer") sentenceQuizAnswer: ElementRef;

  constructor(private router: Router, private logger: NGXLogger, private quizsets: QuizSetService) {
    this.index = 0;

    this.playtime = 0;
    this.correctCount = 0;
    this.wrongCount = 0;

    this.quizzes = quizsets.get();
  }

  ngOnInit() {
    if (!this.quizzes || this.quizzes.length == 0)
      return this.gotoHomePage();


    this.showResult = false;
    this.currentQuiz = this.quizzes[0];
  }

  gotoHomePage() {
    this.router.navigate(['']);
  }

  choiceAnswer(number: number) {
    if (!this.clearQuiz) {
      this.choiceNumber = number;
    }
  }

  submit() {
    this.clearQuiz = true;
    let chooseAnswer: string;
    if (this.currentQuiz.type == QuizType.CHOICE_QUIZ)
      chooseAnswer = this.currentQuiz.answerList[this.choiceNumber];
    else
      chooseAnswer = (this.sentenceQuizAnswer.nativeElement as HTMLInputElement).value;

    if (chooseAnswer == this.currentQuiz.correctAnswer) {
      this.logger.debug("정답입니다!");
      this.isCorrect = true;
      this.correctCount++;
    }
    else {
      this.logger.debug("오답입니다!");
      this.isCorrect = false;
      this.chooseNumber = this.choiceNumber;
      this.choiceNumber = this.currentQuiz.answerList.findIndex((answer) => answer == this.currentQuiz.correctAnswer);

      this.wrongCount++;
    }
  }

  nextQuiz() {

    if (this.quizzes.length <= this.index + 1) {
      this.showResult = true;
      return;
    }

    this.index++;

    this.currentQuiz = this.quizzes[this.index];

    this.choiceNumber = undefined;
    this.chooseNumber = undefined;
    this.clearQuiz = false;
    this.isCorrect = false;
  }
}
