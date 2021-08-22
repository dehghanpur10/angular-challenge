import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Subscription} from 'rxjs'

import {GetDataService} from './service/get-data/get-data.service'
import {Operation} from './models/app.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  querySub: Subscription | undefined;
  dataSub: Subscription | undefined;
  operations: Operation[] = []

  constructor(private route: ActivatedRoute, private data: GetDataService) {
  }

  ngOnInit() {
    // query subscribe
    this.querySub = this.route.queryParams.subscribe((query) => {
      this.data.filterData(query['filter']);
    })

    // data subscribe
    this.dataSub = this.data.data.subscribe(
      (operations) => {
        console.log(operations)
        this.operations = operations;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  ngOnDestroy() {
    this.querySub?.unsubscribe()
    this.dataSub?.unsubscribe()
  }
}
