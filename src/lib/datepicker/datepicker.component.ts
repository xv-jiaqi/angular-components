import {Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef, ElementRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {
  startOfMonth, endOfMonth, addMonths, subMonths,
  setYear, eachDay, setMonth,
  getDate, getMonth, getYear,
  isToday, isSameDay, isSameMonth, isSameYear,
  getDay, subDays, addDays, setDay, format} from 'date-fns';
import {DomRendererService} from './dom';

export interface DatepickerOptions {
  minYear?: number;
  maxYear?: number;
  displayFormat?: string; // default: 'MMM D[,] YYYY'
  barTitleFormat?: string; // default: 'MMMM YYYY'
  weekdayNamesFormat?: string; // default 'ddd'
  firstCalendarDay?: number;  // 0 日 1 一
  minDate?: Date;
  maxDate?: Date;
  lang?: string;
  viewTypes?: string[];
}

export interface IDayTypes {
  date: Date;
  day: number;
  month: number;
  year: number;
  inThisMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isSelectable: boolean;
}

const enum EVal {

}

export enum EFirstCalendarDay {
  SUN,
  MON
}

export class Local {

  en: object;
  cn: object;

  constructor() {
    this.en = {};
    this.cn = {
      weekdaysFull: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      weekdaysMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    };

    const baseLocal = {
      weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    const keys = Object.keys(this);

    for (let len = keys.length; len--;) {
      this[keys[len]] = Object.assign({}, baseLocal, this[keys[len]]);
    }
  }
}

const isNil = (value: Date | any) => {
  return (typeof value === 'undefined') || (value === null);
};

@Component({
  moduleId: module.id,
  selector: 'gt-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    DomRendererService,
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
  weekdayNames: string[];
  weekdayNamesFormat: string;
  months: {month: number, isThisMonth: boolean}[];
  lang: string;
  view: string;
  viewTypes: string[];
  years: {year: number; isThisYear: boolean}[];

  bindDocumentClickListener: any;

  days: IDayTypes[][];

  private local: Local;

  private onTouchedCallback: () => void = () => { };

  private onChangeCallback: (_: any) => void = () => { };

  private fmtDate(date: Date): IDayTypes {
    return {
      date: date,
      day: getDate(date),
      month: getMonth(date),
      year: getYear(date),
      inThisMonth: isSameMonth(date, this.date),
      isToday: isToday(date),
      isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
      isSelectable: this.isDateSelectable(date),
    };
  }

  private isDateSelectable(date: Date): boolean {
    const minDate = !isNil(this.options.minDate) && this.options && this.options.minDate;
    const maxDate = !isNil(this.options.maxDate) && this.options && this.options.maxDate;

    return !minDate ||
      !maxDate ||
      minDate < date && date < maxDate;
  }

  get value(): Date {
    return this.innerValue;
  }

  set value(date: Date) {
    this.innerValue = date;
    this.onChangeCallback(this.innerValue);
  }

  constructor(public domRenderer: DomRendererService, public elementRef: ElementRef) {
    this.local = new Local();
  }

  ngOnInit() {
    this.view = 'days';
    this.date = new Date();
    this.setOptions();
    this.initDayNames();
    this.initYears();
    this.initMonths();
    this.onDocumentClickListener();
    // this.options = this.options ? this.options : {};
    // this.local = this.local[this.lang];
    // console.log(this.options, this, 'options');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes) {
      this.setOptions();
      this.initDayNames();
      this.init();
      this.initYears();
      this.initMonths();
    }
  }

  setOptions(): void {
    const today = new Date();
    this.viewTypes = this.options.viewTypes || ['days', 'months', 'years'];
    this.view = this.viewTypes[0];
    this.minYear = this.options.minYear || getYear(today) - 30;
    this.maxYear = this.options.maxYear || getYear(today) + 30;
    this.displayFormat = this.options.displayFormat || 'YYYY-MM-DD';
    this.barTitleFormat = this.options.barTitleFormat || 'YYYY-MM';
    this.weekdayNamesFormat = this.options.weekdayNamesFormat || 'ddd';
    this.firstCalendarDay = this.options.firstCalendarDay || 0;
    this.lang = this.options.lang || 'en';
  }

  initDayNames(): void {
    const weekdayNames = [...this.local[this.lang].weekdaysShort];

    if (this.firstCalendarDay === 1) {
      weekdayNames.push(weekdayNames.shift());
    }

    this.weekdayNames = weekdayNames;
  }

  init(): void {
    this.days = [[]];

    const start = startOfMonth(this.date);
    const end = endOfMonth(this.date);

    const tmp = getDay(start) - this.firstCalendarDay;
    const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;

    for (let i = 1; i <= prevDays; i++) {
      const day = this.fmtDate(subDays(start, i));

      this.days[0].unshift(day);
    }

    const firstWeekLen = this.days[0].length;

    eachDay(start, end).forEach((date, index) => {
      const day = this.fmtDate(date);

      if ((index + firstWeekLen) % 7 ) {
        this.days[this.days.length - 1].push(day);
      } else {
        this.days.push([day]);
      }
    });

    const weeksLen = this.days.length;
    const lastWeekLen = this.days[weeksLen - 1].length;

    for (let len = lastWeekLen, i = 1; len % 7; len++, i++) {
      const day = this.fmtDate(addDays(end, i));

      this.days[weeksLen - 1].push(day);
    }

    this.barTitle = `${getYear(start)}年${getMonth(start) + 1}月`;
    console.log(this);
  }

  initYears(): void {
    const range = this.maxYear - this.minYear;

    this.years = Array.from(new Array(range).fill(this.minYear), (minYear, index) => {
      return {
        year: minYear + index,
        isThisYear: minYear + index === getYear(this.date)
      };
    });
  }

  initMonths(): void {
    // TODO 这里逻辑需要重构
    this.months = Array.from(new Array(12), (month, index) => {
      return {
        month: month || index,
        isThisMonth: index === getMonth(this.date)
      };
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

  toggleView(target?: string): void {
    if (target && this.viewTypes.includes(target)) {
      this.view = target;
      return;
    }

    const index = this.viewTypes.findIndex(view => view === this.view);

    this.view = index + 1 < this.viewTypes.length ? this.viewTypes[index + 1] : this.viewTypes[0];
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

  setMonth(month: number): void {
    this.date = setMonth(this.date, month);
    this.init();
    this.initYears();
    this.toggleView('days');
  }

  setYear(year: number): void {
    this.date = setYear(this.date, year);
    this.init();
    this.initMonths();
    this.toggleView('months');
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

  onDocumentClickListener(): void {
    this.bindDocumentClickListener = this.domRenderer.listen('document', 'click', (e) => {
      this.isOpened = this.elementRef.nativeElement.contains(e.target);
    });
  }

  offDocumentClickListener(): void {
    if (this.bindDocumentClickListener) {
      this.bindDocumentClickListener = null;
    }
  }

  ngOnDestroy(): void {
    this.offDocumentClickListener();
  }
}
