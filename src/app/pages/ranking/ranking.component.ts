import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Rx';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  test: number[];

  title: string;
  quizResults: any[];

  constructor(private route: ActivatedRoute, private router: Router, private logger: NGXLogger, private http: HttpClient) {
    this.test = [1, 2, 3, 4, 5];
  }

  ngOnInit() {
    this.quizResults = [];

    this.sub = this.route.queryParams.subscribe(params => {
      const quizsetId = params.quizeset_id;
      if (quizsetId) {
        this.http.get(`/api/quiz/groups/${quizsetId}`)
          .subscribe(data => {
            this.title = data["data"].title;
          },
          error => {
            this.logger.error(error);
          });

        this.http.get(`/api/quiz/results/${quizsetId}`)
          .subscribe(data => {
            data["data"].forEach(x => {
              this.quizResults.push({
                nickname: x.nickname,
                correct: x.correct,
                wrong: x.wrong,
                time: x.time
              });
            })

          },
          error => {
            this.logger.error(error);
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();

  }

  getMedalResourceName(rank: number) {
    if (rank == 0)
      return "/assets/medal_gold.svg";
    else if (rank == 1)
      return "/assets/medal_silver.svg";
    else if (rank == 2)
      return "/assets/medal_bronze.svg";
    else
      return undefined;
  }

  getPlaytimeString(second: number) {
    return `${Math.floor(second / 3600)}:${Math.floor(second / 60)}:${second % 60}`;
  }

  gotoHomePage() {
    this.router.navigate(['']);
  }

}
