import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtButtonComponent } from './button.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtButtonComponent
  ],
  exports: [
    GtButtonComponent
  ]
})
export class GtButtonModule { }
