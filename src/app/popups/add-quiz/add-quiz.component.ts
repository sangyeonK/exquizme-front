/// <reference types="jquery"/>
import { Component, OnInit } from '@angular/core';

interface JQueryX extends JQuery {
  modal(command : string);
}
@Component({
  selector: 'popup-add-quiz',
  templateUrl: './add-quiz.component.html',

  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  title: String;

  constructor() { }

  ngOnInit() {

  }

  open(title: String) {
    this.title = title;
    (<JQueryX>$("#popup-add-quiz")).modal("show");

  }
}