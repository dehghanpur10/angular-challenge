import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {FetchDataService} from './service/fetch-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute, private data: FetchDataService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((parmas) => {
      console.log(parmas['df'])
    })
  }
}
