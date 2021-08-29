import {Injectable} from '@angular/core';

import {FetchDataService} from '../fetch-data/fetch-data.service'
import {Number, Operation} from '../../../shared/models/app.model'
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private fetch: FetchDataService) {
  }

  filterData(type: string) {
    if (!type) {
      type = "all"
    }
    return this.fetch.getNumber().pipe(
      map((number: Number[]) => {
        return number.filter(number => GetDataService.filterNumber(type, number))
      }),
      mergeMap(numbers => {
        return this.mergeNumber(numbers)
      })
    )
  }

  private static filterNumber(type: string, number: Number): boolean {
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

  private mergeNumber(numbers: Number[]) {
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


}
