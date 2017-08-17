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

  }

  quizCheck(event: Event, index: number) {

  }

  addQuiz(quiz) {
    this.quizzes.push(new Quiz(0, quiz.title));
  }

  delQuiz(event: Event, index: number) {
    this.quizzes = this.quizzes.filter((quiz: Quiz, index2) => {
      if (index == index2) {
        if (quiz.checked)
          this.countOfCheckedQuiz--;
        return false;
      }
      return true;
    });
  }

  modalAddQuiz() {
    this.addQuizComponent.open();
  }
  modalDelQuiz(quizzes: Quiz[]) {
    this.delQuizComponent.open(quizzes);
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

  }
}

