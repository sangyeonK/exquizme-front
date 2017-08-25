import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private location: Location, private http: HttpClient) { }

  ngOnInit() {
  }

  gotoFacebookLogin() {
    window.location.href = "/api/login";
  }

}
