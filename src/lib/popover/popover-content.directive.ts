import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { GtTemplatePortal } from 'get-ui-ng/utils/portal';

/**
 * @docs-private
 */
@Directive({
  selector: '[gtPopoverContent]'
})
export class GtPopoverContent extends GtTemplatePortal<any> {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}
