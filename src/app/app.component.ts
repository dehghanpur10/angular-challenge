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
export class AppComponent   {
}
