/// <reference types="jquery"/>
import { Component, Directive, OnInit, ViewChild, ViewChildren, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Quiz } from './model';
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
  testCount: number;
  testdata: string[];
  @ViewChild(AddQuizComponent) addQuizComponent: AddQuizComponent;
  @ViewChild(DelQuizComponent) delQuizComponent: DelQuizComponent;

  constructor() {
    this.quizzes = [];
    this.countOfCheckedQuiz = this.quizzes.length;
    // TEST DATA
    this.testCount = 0;
    this.testdata = [
      "흐드러져 피는 꽃",
      "바람마저 달콤한",
      "이곳은 꿈",
      "너와 함께 있다면",
      "어디든 마음이 나풀대며",
      "불어올 그림 속",
      "난 네게 취해",
      "아득한 향기에 기대",
      "시간 따위 버려두고",
      "널 바라보고",
      "하얀 달이 뜨면",
      "달에 비친 너를 보고",
      "낮과 밤이 전부 너야",
      "빈틈 없이 (꽉 채워)",
      "모든 숨소리가",
      "너인 것만 같아",
      "덧칠해 좀 더 짙게",
      "이 밤 깊이 번져가고 있어",
      "벗어날 수 없게",
      "눈 감고 내 안의 널 또 찾잖아",
      "난 취해, 좀 더 취해",
      "이 꿈속에 빠져들고 싶어",
      "넌 다가와서",
      "내게만 스며들어",
      "밤의 안부에",
      "널 닮은 붉은",
      "동백이 질투해",
      "달짝한 입술은",
      "눈이 부시게 빛나고",
      "잠재운 마음속에",
      "파도를 부르고",
      "덜 익은",
      "복숭아마저도 달다",
      "휘날리는 꽃잎 아래",
      "네 비단결 옷자락",
      "그 끝을 따라 널 와락 안아",
      "난 네 숨소릴 잘 알아",
      "네가 불어와 내가 들어간",
      "꿈같은 상상",
      "낮과 밤이 전부 너야",
      "일렁이는 (내 맘도)",
      "그 짙은 향기에",
      "홀릴 것 같아",
      "덧칠해 좀 더 짙게",
      "이 밤 깊이 번져가고 있어",
      "벗어날 수 없게",
      "눈 감고 내 안의 널 또 찾잖아",
      "난 취해, 좀 더 취해",
      "이 꿈속에 빠져들고 싶어",
      "넌 다가와서",
      "내게만 스며들어",
      "텅 비어냈던 나의 공간이 채워져",
      "너로 물든 색이 아련하고",
      "눈부시게 빛나",
      "아름답고 따듯했고 신비로워",
      "난 날아, 너와 날아",
      "꿈에 번진 환상 그 안에서",
      "가까워지는 넌",
      "다시 또 마음에 피어나잖아",
      "단 하나, 너만 알아",
      "찾아 헤맨 그곳 바로 너야",
      "다시 눈을 뜨면",
      "내게만 스며들어",
    ];
    //...
  }

  ngOnInit() {

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
    this.quizzes.push(new Quiz(this.testCount, quiz.title));
    this.testCount++;
  }

  modalAddQuiz() {
    this.addQuizComponent.open();
  }
  modalDelQuiz(quizzes: Quiz[]) {
    this.delQuizComponent.open(quizzes);
  }

  delQuiz() {
    this.testCount = 0;
    this.quizzes = [];
    this.countOfCheckedQuiz = this.quizzes.length;
  }

  checkQuiz(checked, quiz: Quiz, index: number) {
    quiz.checked = checked;
    checked ? this.countOfCheckedQuiz++ : this.countOfCheckedQuiz--;
  }
}

