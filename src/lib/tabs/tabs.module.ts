import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GtTabGroupComponent } from './tab-group.component';
import { GtTabComponent } from './tab.component';
import { GtTabHeaderComponent } from './tab-header.component';
import { GtTabBodyComponent, GtTabBodyHost } from './tab-body.component';
import { GtTabLabel } from './tab-label.directive';
import { GtComponentPortalOutlet, GtTemplatePortalOutlet } from './portal-directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtTabGroupComponent,
    GtTabHeaderComponent,
    GtTabBodyComponent,
    GtTabComponent,
    GtTabBodyHost,
    GtTabLabel,
    GtTemplatePortalOutlet,
    GtComponentPortalOutlet
  ],
  exports: [
    GtTabGroupComponent,
    GtTabHeaderComponent,
    GtTabBodyComponent,
    GtTabComponent,
    GtTabLabel,
    GtTemplatePortalOutlet,
    GtComponentPortalOutlet
  ]
})

export class GtTabsModule { }
