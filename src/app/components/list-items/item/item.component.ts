import {Component, OnInit, Input} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import {Operation} from '../../../models/app.model'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [
    trigger('show', [
      state('in', style({
        opacity:"1"
      })),
      transition('void => *', [
        style({ opacity:"0" }),
        animate(400)
      ])
    ])

  ]
})
export class ItemComponent implements OnInit {
  @Input() data: Operation = {value1: 0, value2: 0, action: ''}

  constructor() {
  }

  ngOnInit(): void {
  }

  getBorder() {
    if (typeof this.data.value2 === "string") {
      return '5px solid red'
    }
    if (this.data.action === 'add') {
      return '5px solid green'
    } else {
      return '5px solid orange'
    }
  }

  getResult() {
    if (typeof this.data.value2 === "string") {
      return 'MISSING DATA'
    }
    if (this.data.action === 'add') {
      return '' + this.data.value1 + ' + ' + this.data.value2 + ' = ' + (this.data.value1 + <number>this.data.value2)
    } else {
      return '' + this.data.value1 + ' * ' + this.data.value2 + ' = ' + (this.data.value1 * <number>this.data.value2)
    }
  }
}
