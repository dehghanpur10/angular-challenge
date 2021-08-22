import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Number, Action} from '../../models/app.model'
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  numberUrl = 'assets/Number.json';
  addUrl = 'assets/Add.json';
  multiplyUrl = 'assets/Multiply.json';

  constructor(private http: HttpClient) {
  }

  getNumber() {
    return this.http.get<Number[]>(this.numberUrl)
  }

  private getAdd() {
    return this.http.get<Action>(this.addUrl).pipe(
      map(add => add.value),
    )
  }

  private getMultiply() {
    return this.http.get<Action>(this.multiplyUrl).pipe(
      map(multiply => multiply.value)
    )
  }

  getActionValue() {
    return this.getAdd().pipe(
      mergeMap(add => this.getMultiply().pipe(map(multiply => {
        return {add: add, multiply: multiply}
      })))
    )
  }
}
