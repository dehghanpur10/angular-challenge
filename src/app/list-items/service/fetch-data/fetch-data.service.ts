import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Number, Action} from '../../../shared/models/app.model'
import {catchError, map} from "rxjs/operators";
import {combineLatest, of} from "rxjs";

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
    return combineLatest([
      this.getAdd().pipe(catchError(() => of("MISSING DATA"))),
      this.getMultiply().pipe(catchError(() => of("MISSING DATA")),)
    ]).pipe(
      map(([add,multiply])=>{
        return {add,multiply}
      })
    )

  }
}
