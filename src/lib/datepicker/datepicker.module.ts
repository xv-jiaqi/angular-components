import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtDatepickerComponent } from './datepicker.component';
import { GtTimepickerComponent } from './timepicker.component';
import { GtDateTmepickerComponent } from './dateTimepicker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    GtDatepickerComponent,
    GtTimepickerComponent,
    GtDateTmepickerComponent,
  ],
  exports: [
    GtDatepickerComponent,
    GtTimepickerComponent,
    GtDateTmepickerComponent,
  ]
})
export class GtDatepickerModule { }
