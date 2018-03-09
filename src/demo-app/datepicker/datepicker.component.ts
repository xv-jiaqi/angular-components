import { Component, OnInit } from '@angular/core';
// import * as enLocale from 'zh_cn';
@Component({
  moduleId: module.id,
  selector: 'gt-datepicker-demo',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  date: Date;
  options: object;
  // options: any = {
  //   locale: enLocale
  // };

  constructor() {
    this.date = new Date();
    this.options = {};
  }

  ngOnInit() {}
}
