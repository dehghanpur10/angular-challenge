import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Number, Action} from '../../../../shared/models/app.model'
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

  getAdd() {
    return this.http.get<Action>(this.addUrl).pipe(
      map(add => add.value),
    )
  }

  getMultiply() {
    return this.http.get<Action>(this.multiplyUrl).pipe(
      map(multiply => multiply.value)
    )
  }

  getActionValue() {
    return this.getAdd().pipe(
      catchError(() => of("MISSING DATA")),
      mergeMap(add => this.getMultiply().pipe(
        catchError(() => of("MISSING DATA")),
        map(multiply => {
          return {add: add, multiply: multiply}
        })))
    )
  }
}
