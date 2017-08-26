import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/subscription';
import { NGXLogger } from 'ngx-logger';

import { Quiz } from '../../models/model';
import { QuizSetService } from '../../services/quiz-set.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-start-solve-quiz',
  templateUrl: './start-solve-quiz.component.html',
  styleUrls: ['./start-solve-quiz.component.scss']
})
export class StartSolveQuizComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  title: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private logger: NGXLogger, private util: UtilService, private quizset: QuizSetService) {
  }

  ngOnInit() {
    this.quizset.set([]);

    this.sub = this.route.params.subscribe(x => {
      const quizsetId = x.quizsetId;
      if (quizsetId) {
        this.http.get(`/api/quiz/groups/${quizsetId}`)
          .subscribe(data => {
            this.logger.debug(data);

            let quizzes: Quiz[] = [];
            this.title = data["data"].title;
            data["data"].quiz_list.forEach(x => {
              let correctAnswer: string;
              const correctId = x.quiz_answer.quiz_option_id;
              const answerList = x.quiz_option_list.map(x2 => {
                if (x2.id == correctId)
                  correctAnswer = x2.text;
                return x2.text;
              });

              const quiz: Quiz = new Quiz(x.id, x.text, x.quiz_type, correctAnswer, this.util.shuffle(answerList));
              this.logger.debug(quiz);
              quizzes.push(quiz);
            });

            this.quizset.id = data["data"].id;
            this.quizset.set(quizzes);
          },
          error => {

          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoSolveQuizPage() {
    if (this.quizset.get().length != 0)
      this.router.navigate(['solve_quiz']);

  }
}
