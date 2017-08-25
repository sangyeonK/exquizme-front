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
        console.log(data);
        data["data"].forEach(e => {
          let quiz = new Quiz(e["id"], e["text"]);
          quiz.type = e["quiz_type"];
          this.quizzes.push(quiz);
        });
      },
      error => {
        console.log(error);
      });

  }

  quizCheck(event: Event, index: number) {

  }

  addQuiz(quiz) {
    this.quizzes.push(quiz);
  }

  delQuiz(event: Event, index: number) {
    let quiz: Quiz = this.quizzes[index];
    this.http.delete(`/api/quizzes/${quiz.id}`)
      .subscribe(data => {
        console.log(data);
        this.quizzes = this.quizzes.filter((quiz: Quiz, index2) => {
          if (index == index2) {
            if (quiz.checked)
              this.countOfCheckedQuiz--;
            return false;
          }
          return true;
        });

      }, error => {
        console.log(error);

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
    this.countOfCheckedQuiz = 0;
    this.quizzes = this.quizzes.filter((quiz: Quiz) => quiz.checked == false);
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
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}

