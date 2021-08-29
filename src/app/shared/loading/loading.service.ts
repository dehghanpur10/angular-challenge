import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  load = new Subject<boolean>()

  constructor() {
  }

  turnOnLoading() {
    this.load.next(true);
  }

  turnOffLoading() {
    this.load.next(false);
  }
}
