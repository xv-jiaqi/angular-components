import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { GtTemplatePortal } from 'get-ui-ng/utils/portal';

@Directive({
  selector: '[gtPopoverRoot]'
})
export class GtPopoverRoot extends GtTemplatePortal<any> {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}
