import { Component, OnInit, ViewChild } from '@angular/core';
import { AddQuizComponent } from '../../popups/add-quiz/add-quiz.component'

@Component({
  selector: 'app-minicon',
  templateUrl: './minicon.component.html',
  styleUrls: ['./minicon.component.scss']
})
export class MiniconComponent implements OnInit {

  @ViewChild(AddQuizComponent) addQuizComponent: AddQuizComponent;
  constructor() { 

  }

  ngOnInit() {

  }

  modalAddQuiz() {

    this.addQuizComponent.open("팝업 텍스트 띄우기");
  }

}
