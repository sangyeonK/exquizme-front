import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  picture: string;
  name: string;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.name = this.auth.name;
    this.picture = this.auth.pictureURL;

    this.sub = this.auth.subscribe(auth => {
      this.name = auth.name;
      this.picture = auth.pictureURL;
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoHomePage() {
    this.router.navigate(['']);
  }

}
