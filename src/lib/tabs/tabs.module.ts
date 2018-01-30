import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GtTabGroupComponent } from './tab-group.component';
import { GtTabComponent } from './tab.component';
import { GtTabHeaderComponent } from './tab-header.component';
import { GtTabBodyComponent, GtTabBodyHost } from './tab-body.component';
import { GtTabLabel } from './tab-label.directive';
import { GtPortalModule } from 'get-ui-ng/portal';

@NgModule({
  imports: [
    CommonModule,
    GtPortalModule
  ],
  declarations: [
    GtTabGroupComponent,
    GtTabHeaderComponent,
    GtTabBodyComponent,
    GtTabComponent,
    GtTabBodyHost,
    GtTabLabel
  ],
  exports: [
    GtTabGroupComponent,
    GtTabHeaderComponent,
    GtTabBodyComponent,
    GtTabComponent,
    GtTabLabel
  ]
})

export class GtTabsModule { }
