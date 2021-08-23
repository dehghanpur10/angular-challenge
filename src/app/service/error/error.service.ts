import {Injectable} from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error = new Subject<string>()

  constructor() {
  }

  createError(error: string) {
    this.error.next(error)
  }
}
