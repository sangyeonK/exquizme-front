import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

import { Quiz, QuizType } from '../../models/model';
import { UtilService } from '../../services/util.service';
import { QuizSetService } from '../../services/quiz-set.service';
import { SubmitResultComponent } from '../../popups/submit-result/submit-result.component';

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

  startTime: number;
  //결과
  showResult: boolean;
  playtime: number;
  correctCount: number;
  wrongCount: number;

  @ViewChild("sentenceQuizAnswer") sentenceQuizAnswer: ElementRef;
  @ViewChild(SubmitResultComponent) submitResultComponent: SubmitResultComponent;

  constructor(private router: Router, private logger: NGXLogger, private quizset: QuizSetService, private util: UtilService, private http: HttpClient) {
    this.index = 0;

    this.playtime = 30;
    this.correctCount = 0;
    this.wrongCount = 0;

    this.quizzes = quizset.get();
  }

  ngOnInit() {
    if (!this.quizzes || this.quizzes.length == 0)
      return this.gotoHomePage();


    this.showResult = false;
    this.startTime = this.util.unixtime();
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
      this.playtime = this.util.unixtime() - this.startTime;
      return;
    }

    this.index++;

    this.currentQuiz = this.quizzes[this.index];

    this.choiceNumber = undefined;
    this.chooseNumber = undefined;
    this.clearQuiz = false;
    this.isCorrect = false;
  }

  getPlaytimeString() {
    return `${Math.floor(this.playtime / 60)}분 ${this.playtime % 60}초`;
  }

  modalSubmitResult() {
    this.submitResultComponent.open();
  }

  submitResult(nickname) {
    this.logger.debug(nickname);
    const body = {
      quiz_group_id: this.quizset.id,
      correct: this.correctCount,
      wrong: this.wrongCount,
      time: this.playtime,
      nickname: nickname
    };

    this.http.post('/api/quiz/results', body)
      .subscribe(data => {
        this.logger.debug(data);

        this.gotoRankingPage();

      },
      error => {
        this.logger.error(error);

      });

  }

  gotoRankingPage() {
    this.router.navigate([`/ranking`], { queryParams: { quizset_id: this.quizset.id }});
  }

}
