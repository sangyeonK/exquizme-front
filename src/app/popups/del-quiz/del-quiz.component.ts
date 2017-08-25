/// <reference types="jquery"/>
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../services/util.service';

interface JQueryX extends JQuery {
  modal(command: any);
}

@Component({
  selector: 'popup-del-quiz',
  templateUrl: './del-quiz.component.html',
  styleUrls: ['./del-quiz.component.scss']
})
export class DelQuizComponent implements OnInit {

  id: string;

  @Output() ok: EventEmitter<object>;

  constructor(private util: UtilService, private http: HttpClient) {
    this.ok = new EventEmitter<object>();
  }

  ngOnInit() {
    this.id = `popup-del-quiz_${this.util.randomString(5)}`;
  }

  open() {
    (<JQueryX>$(`#${this.id}`)).modal({
      onApprove: () => this.delQuiz()
    }).modal("show");

  }

  delQuiz() {
    const body = {
      quiz_group_id: 2,
      correct: 1,
      wrong: 2,
      time: 100,
      nickname: "넥스터즈3"
    }
    this.http.post("/api/quiz/results", body)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      })
    this.ok.emit();
  }
}
