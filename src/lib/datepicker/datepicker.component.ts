import {Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
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
  minDate?: Date;
  maxDate?: Date;
}

const isNil = (value: Date | any) => {
  return (typeof value === 'undefined') || (value === null);
};

@Component({
  selector: 'gt-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GtDatepickerComponent), multi: true }
  ]
})
export class GtDatepickerComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() options: DatepickerOptions;

  @Input() isOpened = false;

  innerValue: Date;
  barTitle: string;
  minYear: number;
  maxYear: number;
  firstCalendarDay: number;
  date: Date;
  dayNames: string[];
  displayValue: string;
  years: {year: number; isThisYear: boolean}[];

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

  private onTouchedCallback: () => void = () => { };

  private onChangeCallback: (_: any) => void = () => { };

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

  get value(): Date {
    return this.innerValue;
  }

  set value(date: Date) {
    this.innerValue = date;
    this.onChangeCallback(this.innerValue);
  }

  constructor() {
    const date = new Date();
    this.barTitle = '2018-3';
  }

  ngOnInit() {
    this.date = new Date();
    this.setOptions();
    this.initDayNames();
    this.initYears();
    this.options = this.options ? this.options : {};
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes) {
      this.setOptions();
      this.initDayNames();
      this.init();
      this.initYears();
    }
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
  }

  close(): void {
    this.isOpened = false;
  }

  // 父组件的值变更时，更新model的值
  writeValue(val: Date) {
    if (val) {
      this.date = val;
      this.innerValue = val;
      this.init();
      // this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
      // this.barTitle = format(startOfMonth(val), this.barTitleFormat, this.locale);
    }
  }

  // 表单ControlValueAccessor接口
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // 表单ControlValueAccessor接口
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setOptions(): void {
    const today = new Date();
    this.minYear = this.options.minYear || getYear(today) - 30;
    this.maxYear = this.options.maxYear || getYear(today) + 30;
    this.firstCalendarDay = this.options.firstCalendarDay || 0;
  }

  initDayNames(): void {
    this.dayNames = [
      '周日', '周一', '周二', '周三', '周四', '周五', '周六',
    ];
  }

  private isDateSelectable(date: Date): boolean {
    const minDate = !isNil(this.options.minDate) && this.options && this.options.minDate;
    const maxDate = !isNil(this.options.maxDate) && this.options && this.options.maxDate;

    return !minDate ||
      !maxDate ||
      minDate < date && date < maxDate;
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

    this.barTitle = `${getYear(this.innerValue)}年${getMonth(this.innerValue)}月`;
  }

  initYears(): void {
    const range = this.maxYear - this.minYear;

    this.years = Array.from(new Array(range).fill(this.minYear), (minYear, index) => {
      return {year: minYear + index, isThisYear: minYear + index === getYear(this.date)};
    });
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
  }
}
