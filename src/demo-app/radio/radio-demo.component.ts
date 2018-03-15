import { Component, OnInit } from '@angular/core';
import { GtRadioSelectType } from 'get-ui-ng/base';
@Component({
  moduleId: module.id,
  selector: 'gt-radio-demo',
  templateUrl: './radio-demo.component.html',
  styleUrls: ['./radio-demo.component.css']
})

export class RadioDemoComponent implements OnInit {
  key = '1';
  returnObj: any;
  constructor() {
  }

  ngOnInit() {

  }

  getChange(e: GtRadioSelectType) {
    this.returnObj = e;
  }
}
