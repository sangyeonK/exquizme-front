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
      const body = {
        text: (this.choiceQuizTitle.nativeElement as HTMLTextAreaElement).value,
        type: this.quizType,
        options: this.choiceQuizAnswer.map(x => (x.nativeElement as HTMLInputElement).value),
        answerIdx: 0
      };

      this.http.post("/api/quizzes", body)
        .subscribe(data => {
          let quiz: Quiz = new Quiz(data["data"].id, body.text, body.type, body.options[body.answerIdx], body.options);
          this.ok.emit(quiz);
        },
        error => {
        });
    }
    else {
      const body = {
        text: (this.choiceQuizTitle.nativeElement as HTMLTextAreaElement).value,
        type: this.quizType,
        options: [(this.sentenceQuizAnswer.nativeElement as HTMLTextAreaElement).value],
        answerIdx: 0
      };

      this.http.post("/api/quizzes", body)
        .subscribe(data => {
          let quiz: Quiz = new Quiz(data["data"].id, body.text, body.type, body.options[body.answerIdx], body.options);
          this.ok.emit(quiz);
        },
        error => {
        });
    }
  }

}