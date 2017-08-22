import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Quiz } from "../../models/model";
import { ShareQuizCompleteComponent } from "../share-quiz-complete/share-quiz-complete.component";

interface JQueryX extends JQuery {
  modal(command: any);
}

@Component({
  selector: 'popup-share-quiz',
  templateUrl: './share-quiz.component.html',
  styleUrls: ['./share-quiz.component.scss']
})
export class ShareQuizComponent implements OnInit {
  quizzes: Quiz[];
  id: string;

  @ViewChild("title") title: ElementRef;
  @ViewChild(ShareQuizCompleteComponent) shareQuizCompleteComponent: ShareQuizCompleteComponent;

  constructor(private util: UtilService, private chRef: ChangeDetectorRef) {
    this.quizzes = [];
  }

  ngOnInit() {
    this.id = `popup-share-quiz_${this.util.randomString(5)}`;
  }

  open(quizzes: Quiz[]) {
    if (!quizzes || quizzes.length == 0)
      return;

    this.quizzes = quizzes;

    this.chRef.detectChanges();

    (<JQueryX>$(`#${this.id}`)).modal({
      onApprove: () => this.shareQuiz()
    }).modal("show");

  }

  shareQuiz() {
    const title = this.title.nativeElement as HTMLInputElement;
    this.shareQuizCompleteComponent.open(title.value);
  }
}
