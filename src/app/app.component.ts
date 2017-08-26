import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loadingComplete: boolean = false;
  env = environment;
  title = 'ExquizME';
  sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
    this.http.get('api/user')
      .subscribe(data => {
        this.auth.name = data["data"].nickname;
        this.loadingComplete = true;
      },
      err => {
        this.loadingComplete = true;
      }
      );

    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if (params['code'])
        this.router.navigate(['start_solve_quiz']);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
