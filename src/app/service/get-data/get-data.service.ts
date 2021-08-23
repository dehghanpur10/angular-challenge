import {Injectable} from '@angular/core';
import {Subject, Observable, throwError, of} from 'rxjs'

import {FetchDataService} from '../fetch-data/fetch-data.service'
import {Operation} from '../../models/app.model'
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {Number} from '../../models/app.model'

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  data = new Subject<Operation[]>()

  constructor(private fetch: FetchDataService) {
  }

  private filterNumber(type: string, number: Number): boolean {
    if (type === "all") {
      return true
    }
    if (type === "add" && number.action === "add") {
      return true
    }
    if (type === "multiply" && number.action === "multiply") {
      return true
    }
    return false
  }

  private mergeNumber(type: string, numbers: Number[]) {
    return this.fetch.getActionValue().pipe(
      map(actionValue => {
        let operations: Operation[] = [];
        for (const number of numbers) {
          if (number.action === "add") {
            operations.push({
              value1: number.value,
              value2: actionValue.add,
              action: "add",
            })
          } else {
            operations.push({
              value1: number.value,
              value2: actionValue.multiply,
              action: "multiply",
            })
          }
        }
        return operations
      })
    )

  }

  filterData(type: string) {
    if (!type) {
      type = "all"
    }

    this.fetch.getNumber().pipe(
      map((number: Number[]) => {
        return number.filter(number => this.filterNumber(type, number))
      }),
      mergeMap(numbers => {
        return this.mergeNumber(type, numbers)
      })
    ).subscribe(
      operations => {
        this.data.next(operations);
      },
      error => {
        this.data.error("error in number file")
      }
    )

  }

}
