import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtPaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GtPaginationComponent
  ],
  declarations: [
    GtPaginationComponent
  ]
})
export class GtPaginationModule { }
