import {Component, Input, OnInit, HostListener, ElementRef, Renderer } from '@angular/core';
// import {DomRendererService} from './dom';
// import {GtDatepickerComponent} from './datepicker.component';

@Component({
  moduleId: module.id,
  selector: 'gt-date-timepicker',
  templateUrl: './dateTimepicker.component.html',
  styleUrls: ['./dateTimepicker.component.css'],
  // providers: [DomRendererService],
})
export class GtDateTmepickerComponent {
  @Input() minDate: Date;

  @Input() mindateOptions: object;

  @Input() maxDate: Date;

  @Input() maxdateOptions: object;

  constructor() {}

  ngOnInit(): void {
    this.mindateOptions = {};
    this.maxdateOptions = {};
  }

  // watch(): void {
  //   if (this.maxdateOptions && this.minDate && this.maxDate) {
  //     Object.assign(this.mindateOptions, {minDate: this.minDate});
  //     Object.assign(this.maxdateOptions, {maxDate: this.maxDate});
  //     console.log({max: this.maxDate.toLocaleString(), min: this.minDate.toLocaleString()});
  //   }
  // }
}

