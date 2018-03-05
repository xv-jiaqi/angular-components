import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtModalModule } from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtModalModule
  ]
})

export class GtModule { }
