import {Component, OnInit} from '@angular/core';

export interface Dates {
  year: number,
  month: number,
  date: number,
  datesArray: number[]
}

@Component({
  selector: 'gt-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class GtDatepickerComponent implements OnInit {
  year: number;   // 年
  month: number;  // 月
  day: number;    // 日
  hour: number;   // 时
  minute: number; // 分
  second: number; // 秒
  dateObject;     // 数据挂载对象

  constructor() {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
  }

  ngOnInit() {
    this.dateObject = this.getDatesOfMonth(this.year, this.month);
  }

  /**
   * 上个月份数据
   */
  goPrev() {
    this.month--;
    if (this.month === 0) {
      this.month = 12;
      this.year--;
    }
    this.dateObject = this.getDatesOfMonth(this.year, this.month);
  }

  /**
   * 下个月份数据
   */
  goNext() {
    this.month++;
    if (this.month === 13) {
      this.month = 1;
      this.year++;
    }
    this.dateObject = this.getDatesOfMonth(this.year, this.month);
  }

  /**
   * 返回指定年月的日历日期数组
   * @param {number} year
   * @param {number} month
   */
  getDatesOfMonth(year: number, month: number) {
    const datesArray: Array<number> = [];
    const date = new Date(year, month - 1);
    const nowDay = new Date().getDate();
    const day = date.getDay();
    const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
    // 加入上个月的日期
    for (let i = lastDayOfLastMonth; i > lastDayOfLastMonth - day; i--) {
      datesArray.unshift(i);
    }
    // 加入当月日期
    const lastDayOfNowMonth = new Date(year, month, 0).getDate();
    for (let index = 1; index <= lastDayOfNowMonth; index++) {
      datesArray.push(index);
    }
    // 加入下个月日期
    const countOfNextMonth = 42 - lastDayOfNowMonth - day;
    for (let index = 1; index <= countOfNextMonth; index++) {
      datesArray.push(index);
    }
    return {
      year,
      nowDay,
      month,
      datesArray
    };
  }
}
