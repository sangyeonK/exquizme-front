/// <reference types="jquery"/>
import { Component, Directive, OnInit, ViewChild, ViewChildren, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Quiz } from '../../models/model';
import { AddQuizComponent } from '../../popups/add-quiz/add-quiz.component'
import { DelQuizComponent } from '../../popups/del-quiz/del-quiz.component'

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
    )
  ]
})
export class SelectQuizComponent implements OnInit {

  quizzes: Quiz[];
  countOfCheckedQuiz: number;

  @ViewChild(AddQuizComponent) addQuizComponent: AddQuizComponent;
  @ViewChild(DelQuizComponent) delQuizComponent: DelQuizComponent;

  constructor() {
    this.quizzes = [];
    this.countOfCheckedQuiz = this.quizzes.length;
  }

  ngOnInit() {
    this.addQuiz("test");

  }
  quizCheck(event: Event, index: number) {
    console.log(event);
    console.log(index);
    //this.quizzes[index].selected = event.target;

  }
  quizDetail(event: Event, index: number) {

    let target: Element = event.srcElement;
    if (target) {
      let currentQuiz: Quiz = this.quizzes[index];
      (<JQueryX>$(target.parentElement)).popup({
        title: `${currentQuiz.title.substr(0, 15)}...`,
        on: "click"
      });
    }

  }

  addQuiz(quiz) {
    this.quizzes.push(new Quiz(0, quiz.title));
  }

  modalAddQuiz() {
    console.log("modalAddQuiz");
    this.addQuizComponent.open();
  }
  modalDelQuiz(quizzes: Quiz[]) {
    this.delQuizComponent.open(quizzes);
  }

  delQuiz() {
    this.quizzes = this.quizzes.filter((quiz: Quiz) => quiz.checked == false);
    this.countOfCheckedQuiz = 0;
  }

  checkQuiz(checked, quiz: Quiz, index: number) {
    quiz.checked = checked;
    checked ? this.countOfCheckedQuiz++ : this.countOfCheckedQuiz--;
  }
}

