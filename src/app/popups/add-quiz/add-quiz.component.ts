/// <reference types="jquery"/>
import { Component, OnInit, Input, Output, ViewChild, ViewChildren, EventEmitter, ElementRef,QueryList } from '@angular/core';
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

  constructor(private util: UtilService) {
    this.ok = new EventEmitter<object>();
    this.quizType = QuizType.CHOICE_QUIZ;
  }

  ngOnInit() {
    this.id = `popup-add-quiz_${this.util.randomString(5)}`;
  }

  open() {
    (<JQueryX>$(`#${this.id}`)).modal({
      onApprove: () => this.addQuiz()
    }).modal("show");
  }

  addQuiz() {
    if (this.quizType == QuizType.CHOICE_QUIZ) {
      const elQuizTitle = this.choiceQuizTitle.nativeElement as HTMLTextAreaElement;
      let quiz: Quiz = new Quiz(0, elQuizTitle.value);
      quiz.type = this.quizType;
      this.ok.emit(quiz);
    }
    else {
      const elQuizTitle = this.sentenceQuizTitle.nativeElement as HTMLTextAreaElement;
      let quiz: Quiz = new Quiz(0, elQuizTitle.value);
      quiz.type = this.quizType;
      this.ok.emit(quiz);
    }
  }

}