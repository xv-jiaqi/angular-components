import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtBarModule, GtDatepickerModule } from 'get-ui-ng';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtBarModule,
    GtDatepickerModule
  ]
})

export class GtModule { }
