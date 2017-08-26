/// <reference types="jquery"/>
import { Component, Directive, OnInit, ViewChild, ViewChildren, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

import { Quiz, QuizType } from '../../models/model';
import { AddQuizComponent } from '../../popups/add-quiz/add-quiz.component'
import { DelQuizComponent } from '../../popups/del-quiz/del-quiz.component'
import { ShareQuizComponent } from '../../popups/share-quiz/share-quiz.component'

interface JQueryX extends JQuery {
  popup(any: any);
}

@Component({
  selector: 'app-select-quiz',
  templateUrl: './select-quiz.component.html',
  styleUrls: ['./select-quiz.component.scss'],
  animations: [
    trigger(
      'quizCheckPanelAnimation', [
        transition(':enter', [style({
          "margin-top": '-20px',
        }), animate('200ms', style({ "margin-top": '0px' }))]),
        transition(':leave', [style({
          "margin-top": '0px',
        }), animate('0ms', style({ "margin-top": '-20px' }))]),
      ]
    ),
    trigger(
      'expandBottomButton', [
        state("inexpand", style({
          transform: 'rotate(0deg)',
        })),
        state("expand", style({
          transform: 'rotate(-45deg)',
        })),
        transition('inexpand => expand', [animate('200ms ease-in')]),
        transition('expand => inexpand', [animate('200ms ease-out')]),
      ]
    ),
    trigger(
      'expandBottomButton-addQuiz', [
        state("inexpand", style({
          bottom: "34px",
        })),
        state("expand", style({
          bottom: "102px",
        })),
        transition('inexpand => expand', [animate('200ms ease-in')]),
        transition('expand => inexpand', [animate('200ms ease-out')]),
      ]
    ),
    trigger(
      'expandBottomButton-delQuiz', [
        state("inexpand", style({
          bottom: "34px",
        })),
        state("expand", style({
          bottom: "166px",
        })),
        transition('inexpand => expand', [animate('200ms ease-in')]),
        transition('expand => inexpand', [animate('200ms ease-out')]),
      ]
    ),
    trigger(
      'expandBottomButton-shareQuiz', [
        state("inexpand", style({
          right: "20px",
        })),
        state("expand", style({
          right: "88px",
        })),
        transition('inexpand => expand', [animate('200ms ease-in')]),
        transition('expand => inexpand', [animate('200ms ease-out')]),
      ]
    ),
  ]
})
export class SelectQuizComponent implements OnInit {
  eQuizType = QuizType;

  quizzes: Quiz[];
  countOfCheckedQuiz: number;
  expandBottomButton: string = 'inexpand';

  @ViewChild(AddQuizComponent) addQuizComponent: AddQuizComponent;
  @ViewChild(DelQuizComponent) delQuizComponent: DelQuizComponent;
  @ViewChild(ShareQuizComponent) shareQuizComponent: ShareQuizComponent;

  constructor(private logger: NGXLogger, private http: HttpClient) {
    this.quizzes = [];
    this.countOfCheckedQuiz = this.quizzes.length;
  }

  ngOnInit() {
    this.http.get("/api/quizzes")
      .subscribe(data => {
        this.logger.debug(data);
        data["data"].forEach(e => {
          let quiz = new Quiz(e.id, e.text, e.quiz_type, undefined, []);
          this.quizzes.push(quiz);
        });
      },
      error => {
        this.logger.error(error);
      });

  }

  quizCheck(event: Event, index: number) {

  }

  addQuiz(quiz) {
    this.quizzes.unshift(quiz);
  }

  delQuiz(event: Event, index: number) {
    this.stopPropagation(event);

    let quiz: Quiz = this.quizzes[index];
    this.http.delete(`/api/quizzes/${quiz.id}`)
      .subscribe(data => {
        this.quizzes = this.quizzes.filter((quiz: Quiz, index2) => {
          if (index == index2) {
            if (quiz.checked)
              this.countOfCheckedQuiz--;
            return false;
          }
          return true;
        });

      }, error => {

      });


  }
  shareQuiz(title: string) {

  }

  modalAddQuiz() {
    this.addQuizComponent.open();
  }
  modalDelQuiz() {
    this.delQuizComponent.open();
  }
  modalShareQuiz() {
    this.shareQuizComponent.open(this.quizzes.filter((quiz: Quiz) => quiz.checked));
  }

  delCheckedQuiz() {
    let remainCount = this.countOfCheckedQuiz;
    this.quizzes.forEach(x => {
      if (x.checked) {
        this.http.delete(`/api/quizzes/${x.id}`)
          .subscribe(data => {
            remainCount--;
            if (remainCount == 0) {
              this.countOfCheckedQuiz = 0;
              this.quizzes = this.quizzes.filter((quiz: Quiz) => quiz.checked == false);
            }

          },
          error => {
            this.logger.error(error);
          });
      }
    });
  }

  checkQuiz(checked, quiz: Quiz, index: number) {
    quiz.checked = checked;
    checked ? this.countOfCheckedQuiz++ : this.countOfCheckedQuiz--;

  }

  toggleBottomButtons() {
    this.expandBottomButton = (this.expandBottomButton === 'inexpand' ? 'expand' : 'inexpand');
  }

  expandQuiz(quiz: Quiz) {
    quiz.expandShowAnswer = !quiz.expandShowAnswer;
    this.http.get(`/api/quizzes/${quiz.id}`)
      .subscribe(data => {
        this.logger.debug(data);
        const correctId = data["data"].quiz_answer.quiz_option_id;
        quiz.answerList = data["data"].quiz_option_list.map((x, index) => {
          if (x.id == correctId)
            quiz.correctAnswer = x.text;
          return x.text;
        });
      },
      error => {
        this.logger.error(error);
      });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}

