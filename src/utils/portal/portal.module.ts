import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtPortalOutlet, GtRootPortalOutlet } from './portal-directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtPortalOutlet,
    GtRootPortalOutlet
  ],
  exports: [
    GtPortalOutlet,
    GtRootPortalOutlet
  ]
})
export class GtPortalModule { }
