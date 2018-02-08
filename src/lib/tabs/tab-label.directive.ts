import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { GtTemplatePortal } from './portal-base';

@Directive({
  selector: '[gt-tab-label]'
})
export class GtTabLabel extends GtTemplatePortal<any> {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}
