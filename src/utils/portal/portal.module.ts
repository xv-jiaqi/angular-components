import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtPortalOutlet } from './portal-directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtPortalOutlet
  ],
  exports: [
    GtPortalOutlet
  ]
})
export class GtPortalModule { }
