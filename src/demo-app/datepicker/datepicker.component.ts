import {Component, OnInit} from '@angular/core';

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
  minDate: Date;
  maxDate: Date;

  constructor() {
    this.date = new Date('2018-4-9');
    this.options = {
      minYear: 2014,
      maxYear: 2020,
      minDate: new Date('2014-10-11'),
      maxDate: new Date('2038-5-9'),
      displayFormat: 'YYYY-MM-DD',
      barTitleFormat: 'YYYY MM',
      dayNamesFormat: 'd',
      firstCalendarDay: 0,
      lang: 'cn'
    };
    this.minDate = new Date();
    this.maxDate = new Date();
  }

  ngOnInit() {
  }
}
