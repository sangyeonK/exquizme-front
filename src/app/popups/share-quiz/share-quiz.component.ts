import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Quiz } from "../../models/model";

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

  @Output() ok: EventEmitter<string>;

  constructor(private util: UtilService) {
    this.quizzes = [];
    this.ok = new EventEmitter<string>();
  }

  ngOnInit() {
    this.id = `popup-share-quiz_${this.util.randomString(5)}`;
  }

  open(quizzes: Quiz[]) {
    if(!quizzes || quizzes.length == 0)
      return;

    this.quizzes = quizzes;

    (<JQueryX>$(`#${this.id}`)).modal({
      onApprove: () => this.shareQuiz()
    }).modal("show");

  }

  shareQuiz() {
    const title = this.title.nativeElement as HTMLInputElement;
    this.ok.emit(title.value);
  }
}
