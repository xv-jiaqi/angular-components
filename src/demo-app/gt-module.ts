import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtDatepickerModule, GtModalModule } from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtDatepickerModule,
    GtMenuModule,
    GtModalModule
  ]
})

export class GtModule { }
