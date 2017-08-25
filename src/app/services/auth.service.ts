import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Injectable()
export class AuthService {

  private _userID: string;

  userID: string;
  pictureURL: string;
  name: string;

  event: EventEmitter<AuthService>;

  constructor() {
    this.event = new EventEmitter<AuthService>();
    this.userID = undefined;
    this.pictureURL = undefined;
    this.name = undefined;
  }

  emitEvent() {
    this.event.emit(this);
  }

  subscribe(func: (auth:AuthService) => void ) {
    return this.event.asObservable().subscribe(func);
  }
}
