import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtDatepickerComponent } from './datepicker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    GtDatepickerComponent
  ],
  exports: [
    GtDatepickerComponent
  ]
})
export class GtDatepickerModule { }
