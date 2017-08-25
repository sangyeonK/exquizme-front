import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  picture: string;
  name: string;
  sub: Subscription

  constructor(private auth: AuthService) {
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

}
