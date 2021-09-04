import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs'
import {LoadingService} from "./shared/loading/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadSub: Subscription | undefined;
  isError: boolean = false
  errorContent: string = ''
  isLoading: boolean = false;

  constructor(private load: LoadingService) {
  }

  ngOnInit() {
    this.loadSub = this.load.load.subscribe(state => {
      this.isLoading = state
    })
  }

  ngOnDestroy() {
    // @ts-ignore
    this.loadSub.unsubscribe()
  }

}
