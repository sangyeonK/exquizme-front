import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AuthService {

  private _userID: string;

  userID: string;
  pictureURL: string;
  name: string;

  event: EventEmitter<Boolean>;

  constructor() {
    this.event = new EventEmitter<Boolean>();
    this.userID = undefined;
    this.pictureURL = undefined;
    this.name = undefined;

    this.event.asObservable().subscribe((aaa) => {
      console.log(this);
    });

  }

  emitEvent() {
    this.event.emit(true);
  }



}
