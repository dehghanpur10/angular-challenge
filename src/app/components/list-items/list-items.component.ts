import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Operation} from "../../models/app.model";
import {ActivatedRoute} from "@angular/router";
import {GetDataService} from "../../service/get-data/get-data.service";
import {ErrorService} from '../../service/error/error.service'
@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, OnDestroy {
  querySub: Subscription | undefined;
  dataSub: Subscription | undefined;
  operations: Operation[] = []

  constructor(private route: ActivatedRoute, private data: GetDataService,private error:ErrorService) {
  }

  ngOnInit() {
    // query subscribe
    this.querySub = this.route.queryParams.subscribe((query) => {
      this.data.filterData(query['filter']);
    })
    // data subscribe
    this.dataSub = this.data.data.subscribe(
      async (operations) => {
        this.operations = operations
      },
      (err) => {
        this.error.createError("There is a problem on the server")
      }
    )
  }

  ngOnDestroy() {
    this.querySub?.unsubscribe()
    this.dataSub?.unsubscribe()
  }

}
