/// <reference types="jquery"/>
import { Component, OnInit } from '@angular/core';

interface JQueryX extends JQuery {
  modal(command : string);
}

@Component({
  selector: 'popup-del-quiz',
  templateUrl: './del-quiz.component.html',
  styleUrls: ['./del-quiz.component.scss']
})
export class DelQuizComponent implements OnInit {

  title: String;

  constructor() { }

  ngOnInit() {
  }

  open(title: String) {
    this.title = title;
    (<JQueryX>$("#popup-del-quiz")).modal("show");

  }
}
