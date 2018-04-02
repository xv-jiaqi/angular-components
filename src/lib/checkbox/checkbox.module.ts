import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtCheckboxComponent } from './checkbox.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtCheckboxComponent
  ],
  exports: [
    GtCheckboxComponent
  ]
})
export class GtCheckboxModule { }
