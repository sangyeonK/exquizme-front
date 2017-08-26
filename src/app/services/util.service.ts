import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  randomString(length: number): string {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  shuffle(array: Array<any>) {
    let counter = array.length;

    while (counter > 0) {

      let index = Math.floor(Math.random() * counter);

      counter--;

      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  unixtime(): number {
    return Math.round(new Date().getTime() / 1000.0);

  }
}
