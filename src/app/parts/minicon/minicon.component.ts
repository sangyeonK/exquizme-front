import { Component, OnInit, ViewChild } from '@angular/core';
import { AddQuizComponent } from '../../popups/add-quiz/add-quiz.component'
import { DelQuizComponent } from '../../popups/del-quiz/del-quiz.component'

@Component({
  selector: 'app-minicon',
  templateUrl: './minicon.component.html',
  styleUrls: ['./minicon.component.scss']
})
export class MiniconComponent implements OnInit {

  @ViewChild(AddQuizComponent) addQuizComponent: AddQuizComponent;
  @ViewChild(DelQuizComponent) delQuizComponent: DelQuizComponent;
 
  constructor() { 

  }

  ngOnInit() {

  }

  modalAddQuiz() {
    this.addQuizComponent.open("팝업 텍스트 띄우기");
  }

  modalDelQuiz() {
    this.delQuizComponent.open("개별퀴즈 삭제하기");
  }

}
