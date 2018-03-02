import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtComponentPortalOutlet, GtTemplatePortalOutlet } from './portal-directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtTemplatePortalOutlet,
    GtComponentPortalOutlet
  ],
  exports: [
    GtTemplatePortalOutlet,
    GtComponentPortalOutlet
  ]
})
export class GtPortalModule { }
