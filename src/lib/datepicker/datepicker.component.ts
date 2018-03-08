import {Component, OnInit, Input} from '@angular/core';
import {
  startOfMonth, endOfMonth, addMonths, subMonths,
  setYear, eachDay,
  getDate, getMonth, getYear,
  isToday, isSameDay, isSameMonth, isSameYear,
  getDay, subDays, addDays, setDay, format} from 'date-fns';

export interface DatepickerOptions {
  minYear?: number;
  maxYear?: number;
  firstCalendarDay?: number;  // 0 日 1 一
}

@Component({
  selector: 'gt-datepicker',
  templateUrl: './datepicker.component.html',
})
export class GtDatepickerComponent implements OnInit {
  innerValue: Date;
  barTitle: string;
  minYear: number;
  maxYear: number;
  firstCalendarDay: number;
  date: Date;
  dayNames: string[];
  displayValue: string;

  @Input() options: DatepickerOptions;

  @Input() isOpened = false;

  days: {
    date: Date;
    day: number;
    month: number;
    year: number;
    inThisMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isSelectable: boolean;
  }[][];

  get value(): Date {
    return this.innerValue;
  }

  set value(date: Date) {
    this.innerValue = date;
  }

  constructor() {
    const date = new Date();
    this.barTitle = '2018-3';
  }

  ngOnInit() {
    this.date = new Date();
    this.setOptions();
    this.initDayNames();
    this.init();
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
  }

  close(): void {
    this.isOpened = false;
  }

  setOptions(): void {
    const today = new Date();
    this.minYear = getYear(today) - 30;
    this.maxYear = getYear(today) + 30;
    this.firstCalendarDay = 0;
  }

  initDayNames(): void {
    this.dayNames = [
      '周日', '周一', '周二', '周三', '周四', '周五', '周六',
    ];
  }

  private fmtDate(date: Date, isThisMonth: boolean): {
    date: Date;
    day: number;
    month: number;
    year: number;
    inThisMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isSelectable: boolean;
  } {
    return {
      date: date,
      day: getDate(date),
      month: getMonth(date),
      year: getYear(date),
      inThisMonth: isThisMonth,
      isToday: isToday(date),
      isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
      isSelectable: this.isDateSelectable(date),
    };
  }

  private isDateSelectable(date: Date): boolean {
    if (!date) {
      console.log(date);
    }
    return true;
  }

  init(): void {
    this.days = [[]];

    const start = startOfMonth(this.date);
    const end = endOfMonth(this.date);

    const tmp = getDay(start) - this.firstCalendarDay;
    const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;

    for (let i = 1; i <= prevDays; i++) {
      const day = this.fmtDate(subDays(start, i), false);

      this.days[0].unshift(day);
    }

    const firstWeekLen = this.days[0].length;

    eachDay(start, end).forEach((date, index) => {
      const day = this.fmtDate(date, true);

      if ((index + firstWeekLen) % 7 ) {
        this.days[this.days.length - 1].push(day);
      } else {
        this.days.push([day]);
      }
    });

    const weeksLen = this.days.length;
    const lastWeekLen = this.days[weeksLen - 1].length;

    for (let len = lastWeekLen, i = 1; len % 7; len++, i++) {
      const day = this.fmtDate(addDays(end, i), false);

      this.days[weeksLen - 1].push(day);
    }

    console.log(this.days);
  }

  prevMonth() {
    this.date = subMonths(this.date, 1);
    this.init();
  }

  nextMonth() {
    this.date = addMonths(this.date, 1);
    this.init();
  }

  goToday() {
    this.date = new Date();
    this.init();
  }

  setDate(date: Date): void {
    this.date = date;
    this.value = this.date;
    this.displayValue = date.toDateString();
    this.init();
    this.close();

    console.log(date);
  }
}
