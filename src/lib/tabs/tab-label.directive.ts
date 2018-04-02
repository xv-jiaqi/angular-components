import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { GtTemplatePortal } from 'get-ui-ng/utils/portal';

@Directive({
  selector: '[gt-tab-label]'
})
export class GtTabLabel extends GtTemplatePortal<any> {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}
