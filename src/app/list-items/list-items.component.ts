import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Operation} from "../shared/models/app.model";
import {ActivatedRoute} from "@angular/router";
import {GetDataService} from "./service/get-data/get-data.service";
import {LoadingService} from "../shared/loading/loading.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit, OnDestroy {
  querySub: Subscription | undefined;
  operations: Operation[] = []

  constructor(private route: ActivatedRoute, private data: GetDataService, private _snackBar: MatSnackBar,private load: LoadingService) {
  }

  ngOnInit() {
    // query subscribe
    this.querySub = this.route.queryParams.subscribe((query) => {
      this.load.turnOnLoading()
      this.data.filterData(query['filter']).subscribe(
        async (operations) => {
          this.load.turnOffLoading()
          this.operations = operations
        },
        (err) => {
          this._snackBar.open('There is a problem on the server','',{
            duration:5000
          })
        }
      );
    })
  }

  ngOnDestroy() {
    // @ts-ignore
    this.querySub.unsubscribe()
  }

}
