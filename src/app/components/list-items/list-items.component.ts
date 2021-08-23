import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Operation} from "../../models/app.model";
import {ActivatedRoute} from "@angular/router";
import {GetDataService} from "../../service/get-data/get-data.service";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit,OnDestroy {
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
