import {Component, Input, OnInit, HostListener, ElementRef, Renderer } from '@angular/core';
import {
  getHours, getMinutes,
  addHours, subHours, addMinutes, subMinutes} from 'date-fns';
import {DomRendererService} from './dom';

// const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => SelectComponent),
//   multi: true
// };

export interface timepickerOptions {
  minTime?: number;
  maxTime?: number;
  timePlaceholder?: string;
  displayFormat?: string;
  returnType?: string;
  autoSelectToday?: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'gt-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css'],
  providers: [DomRendererService],
})
export class GtTimepickerComponent {
  @Input() options: timepickerOptions;

  @Input() isOpened = false;

  @Input() time = new Date();

  hour: number;
  minute: number;
  date: Date;
  displayValue: string;

  bindDocumentClickListener: any;

  constructor(public domRenderer: DomRendererService, public elementRef: ElementRef) {}

  ngOnInit() {
    this.date = new Date();
    this.init();
    this.displayValue = `${this.hour}:${this.minute}`;
    this.onDocumentClickListener();
  }

  init(): void {
    this.hour = getHours(this.date);
    this.minute = getMinutes(this.date);
  }

  prevHour(): void {
    this.hour = this.hour === 0 ? 23 : --this.hour;
  }

  nextHour(): void {
    this.hour = this.hour === 23 ? 0 : ++this.hour;
  }

  prevMinute(): void {
    this.minute = this.minute === 0 ? 60 : --this.minute;
  }

  nextMinute(): void {
    this.minute = this.minute === 59 ? 0 : ++this.minute;
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
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

