import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs'
import {ErrorService} from './shared/error/error.service'
import {LoadingService} from "./shared/loading/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  errorSub: Subscription | undefined;
  loadSub: Subscription | undefined;
  isError: boolean = false
  errorContent: string = ''
  isLoading: boolean = false;

  constructor(private error: ErrorService, private load: LoadingService) {
  }

  ngOnInit() {
    this.errorSub = this.error.error.subscribe(error => {
      this.errorContent = error;
      this.isError = true;
    })

    this.loadSub = this.load.load.subscribe(state => {
      this.isLoading = state
    })
  }

  ngOnDestroy() {
    // @ts-ignore
    this.errorSub.unsubscribe()
    // @ts-ignore
    this.loadSub.unsubscribe()
  }

}
