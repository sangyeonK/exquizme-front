import { Injectable } from '@angular/core';

import { Quiz, QuizType } from '../models/model';

@Injectable()
export class QuizSetService {

  private quizzes: Quiz[];

  constructor() { }

  set(quizzes: Quiz[]) {
    this.quizzes = quizzes;
  }

  get() {
    return this.quizzes;
  }

}
