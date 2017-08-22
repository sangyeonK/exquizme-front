import { Component, OnInit, ViewChild } from '@angular/core';
import { AddQuizComponent } from '../../popups/add-quiz/add-quiz.component'
import { DelQuizComponent } from '../../popups/del-quiz/del-quiz.component'
import { ShareQuizComponent } from '../../popups/share-quiz/share-quiz.component'
import { SubmitResultComponent } from '../../popups/submit-result/submit-result.component'

@Component({
  selector: 'app-minicon',
  templateUrl: './minicon.component.html',
  styleUrls: ['./minicon.component.scss']
})
export class MiniconComponent implements OnInit {

  @ViewChild(AddQuizComponent) addQuizComponent: AddQuizComponent;
  @ViewChild(DelQuizComponent) delQuizComponent: DelQuizComponent;
  @ViewChild(ShareQuizComponent) shareQuizComponent: ShareQuizComponent;
  @ViewChild(SubmitResultComponent) submitResultComponent: SubmitResultComponent;
 
  constructor() { 

  }

  ngOnInit() {

  }

  modalAddQuiz() {
    this.addQuizComponent.open();
  }

  modalDelQuiz() {
    this.delQuizComponent.open();
  }

  modalShareQuiz() {
    this.shareQuizComponent.open(undefined);
  }

  modalSubmitResult() {
    this.submitResultComponent.open();
  }
}
