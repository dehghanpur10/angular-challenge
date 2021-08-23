import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs'
import {ErrorService} from './service/error/error.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  errorSub:Subscription|undefined;
  isError: boolean = false
  errorContent: string = ''

  constructor(private error: ErrorService) {
  }

  ngOnInit() {
    this.errorSub = this.error.error.subscribe(error => {
      this.errorContent = error;
      this.isError = true;
    })
  }

  ngOnDestroy() {
    this.errorSub?.unsubscribe()
  }

}
