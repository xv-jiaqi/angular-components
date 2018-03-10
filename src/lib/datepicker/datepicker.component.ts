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
  displayFormat?: string; // default: 'MMM D[,] YYYY'
  barTitleFormat?: string; // default: 'MMMM YYYY'
  dayNamesFormat?: string; // default 'ddd'
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
  styleUrls: ['./datepicker.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GtDatepickerComponent), multi: true }
  ]
})
export class GtDatepickerComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() options: DatepickerOptions;

  @Input() isOpened = false;

  date: Date;
  innerValue: Date;
  displayValue: string;
  displayFormat: string;
  barTitle: string;
  barTitleFormat: string;
  minYear: number;
  maxYear: number;
  firstCalendarDay: number;
  dayNames: string[];
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

  private _locale: object;
  private _locale_cn: object;

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
    this._locale = {
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
    this._locale_cn = {
      dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    };
  }

  ngOnInit() {
    this.date = new Date();
    this.setOptions();
    this.initDayNames();
    this.initYears();
    console.log(this.options, 'options');
    // this.options = this.options ? this.options : {};
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes) {
      this.setOptions();
      this.initDayNames();
      this.init();
      this.initYears();
    }
  }

  setOptions(): void {
    const today = new Date();
    this.minYear = this.options.minYear || getYear(today) - 30;
    this.maxYear = this.options.maxYear || getYear(today) + 30;
    this.firstCalendarDay = this.options.firstCalendarDay || 0;
  }

  initDayNames(): void {
    this.dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
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

    this.barTitle = `${getYear(start)}年${getMonth(start) + 1}月`;
    console.log(this);
  }

  initYears(): void {
    const range = this.maxYear - this.minYear;

    this.years = Array.from(new Array(range).fill(this.minYear), (minYear, index) => {
      return {year: minYear + index, isThisYear: minYear + index === getYear(this.date)};
    });
  }

  prevMonth(): void {
    this.date = subMonths(this.date, 1);
    this.init();
  }

  nextMonth(): void {
    this.date = addMonths(this.date, 1);
    this.init();
  }

  goToday() {
    this.value = new Date();
    this.date = new Date();
    this.init();
  }

  setDate(date: Date): void {
    this.date = date;
    this.value = this.date;
    this.displayValue = `${getYear(date)}-${getMonth(date) + 1}-${getDate(date)}`;
    this.init();
    this.close();
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
}
