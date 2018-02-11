import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtDatepickerComponent } from './datepicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtDatepickerComponent
  ],
  exports: [
    GtDatepickerComponent
  ]
})
export class GtDatepickerModule { }
