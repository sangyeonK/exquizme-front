import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router:Router, private auth: AuthService) { }

  ngOnInit() {
  }

  gotoSelectQuizPage() {
    if(!this.auth.name) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/select_quiz']);
  }

}
