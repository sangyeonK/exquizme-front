import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  env = environment;
  title = 'ExquizME';
  sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if(params['code'])
        this.router.navigate(['start_solve_quiz']);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
