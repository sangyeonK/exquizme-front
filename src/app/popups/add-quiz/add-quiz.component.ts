/// <reference types="jquery"/>
import { Component, OnInit, Input, Output, ViewChild, ViewChildren, EventEmitter, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../services/util.service';
import { Quiz, QuizType } from '../../models/model';

interface JQueryX extends JQuery {
  modal(command: any);
}

@Component({
  selector: 'popup-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  eQuizType = QuizType;

  id: string;
  quizType: QuizType;

  @ViewChild("choiceQuizTitle") choiceQuizTitle: ElementRef;
  @ViewChildren("choiceQuizAnswer") choiceQuizAnswer: QueryList<ElementRef>;
  @ViewChild("sentenceQuizTitle") sentenceQuizTitle: ElementRef;
  @ViewChild("sentenceQuizAnswer") sentenceQuizAnswer: ElementRef;

  @Output() ok: EventEmitter<object>;

  constructor(private util: UtilService, private chRef: ChangeDetectorRef, private http: HttpClient) {
    this.ok = new EventEmitter<object>();
    this.quizType = QuizType.CHOICE_QUIZ;
  }

  ngOnInit() {
    this.id = `popup-add-quiz_${this.util.randomString(5)}`;
  }

  open() {
    this.clear();
    this.quizType = QuizType.CHOICE_QUIZ;
    this.chRef.detectChanges();

    (<JQueryX>$(`#${this.id}`)).modal({
      onApprove: () => this.addQuiz()
    }).modal("show");
  }

  clear() {
    (this.choiceQuizTitle.nativeElement as HTMLTextAreaElement).value = "";
    this.choiceQuizAnswer.forEach((item) => {
      (item.nativeElement as HTMLInputElement).value = "";
    });
    (this.sentenceQuizTitle.nativeElement as HTMLTextAreaElement).value = "";
    (this.sentenceQuizAnswer.nativeElement as HTMLTextAreaElement).value = "";
  }

  addQuiz() {
    if (this.quizType == QuizType.CHOICE_QUIZ) {
      const elQuizTitle = this.choiceQuizTitle.nativeElement as HTMLTextAreaElement;
      let quiz: Quiz = new Quiz(0, elQuizTitle.value);
      quiz.type = this.quizType;
      this.choiceQuizAnswer.forEach((item, index) => {
        const elQuizAnswer = item.nativeElement as HTMLInputElement;
        if (index == 0) {
          //첫번째 요소가 정답
          quiz.correctAnswer = elQuizAnswer.value;
        }
        quiz.answerList.push(elQuizAnswer.value);
      })

      const body = {
        text: quiz.title,
        type: quiz.type,
        options: quiz.answerList,
        answerIdx: 0
      };

      this.http.post("/api/quizzes", body)
        .subscribe(data => {
          console.log(data);
          quiz.id = data["data"]["id"];
          this.ok.emit(quiz);
        },
        error => {
          console.log(error);
        });
    }
    else {
      const elQuizTitle = this.sentenceQuizTitle.nativeElement as HTMLTextAreaElement;
      let quiz: Quiz = new Quiz(0, elQuizTitle.value);
      quiz.type = this.quizType;
      const elQuizAnswer = this.sentenceQuizAnswer.nativeElement as HTMLTextAreaElement;
      quiz.correctAnswer = elQuizAnswer.value;

      const body = {
        text: quiz.title,
        type: quiz.type,
        options: [quiz.correctAnswer],
        answerIdx: 0
      };

      this.http.post("/api/quizzes", body)
        .subscribe(data => {
          console.log(data);
          quiz.id = data["data"]["id"];
          this.ok.emit(quiz);
        },
        error => {
          console.log(error);
        });
    }
  }

}