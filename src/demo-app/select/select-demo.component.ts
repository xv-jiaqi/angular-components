import { Component, OnInit } from '@angular/core';
import { GtRadioSelectType } from 'get-ui-ng/base';

@Component({
  moduleId: module.id,
  selector: 'gt-select-demo',
  templateUrl: './select-demo.component.html',
  styleUrls: ['./select-demo.component.css']
})

export class SelectDemoComponent implements OnInit {
  key: any;
  options = [
    {
      value: 'https://angular.io/tutorial',
      label: 'Tour of Heroes'
    },
    {
      value: 'https://github.com/angular/angular-cli/wiki',
      label: 'CLI Documentation'
    },
    {
      value: 'https://blog.angular.io/',
      label: 'Angular blog'
    }
  ];
  constructor() {
  }

  ngOnInit() {

  }
}
