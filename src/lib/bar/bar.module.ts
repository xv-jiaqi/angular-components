import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtBarComponent } from './bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtBarComponent
  ],
  exports: [
    GtBarComponent
  ]
})
export class GtBarModule { }
