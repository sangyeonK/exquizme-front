import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

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

  constructor(private util: UtilService, private chRef: ChangeDetectorRef, private logger: NGXLogger, private http: HttpClient) {
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
    let quiz_ids: Array<number> = [];

    this.quizzes.forEach(q => {
      quiz_ids.push(q.id);
    });
    const body = {
      title: (this.title.nativeElement as HTMLInputElement).value,
      quiz_ids: quiz_ids
    }

    this.http.post("/api/quiz/groups", body)
      .subscribe(data => {
        this.logger.debug(data);
        this.shareQuizCompleteComponent.open(data["data"].id, data["data"].title);

      },
      error => {
        this.logger.error(error);
      });

  }
}
