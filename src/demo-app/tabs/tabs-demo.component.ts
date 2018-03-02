import { Component, OnInit } from '@angular/core';
import { GtTabType } from 'get-ui-ng/base';

@Component({
  moduleId: module.id,
  selector: 'gt-tabs-demo',
  templateUrl: './tabs-demo.component.html',
  styleUrls: ['./tabs-demo.component.css']
})
export class TabsDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  tabType = GtTabType.BUTTON
}
