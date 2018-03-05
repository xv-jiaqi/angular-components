import { Component, Directive, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { GtTemplatePortal } from 'get-ui-ng/utils/portal';

/**
 * @docs-private
 */
@Directive({
  selector: '[gtStepBodyHost]'
})
export class GtStepBodyHost extends GtTemplatePortal<any> {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

@Component({
  moduleId: module.id,
  selector: 'gt-step-body',
  templateUrl: './step-body.component.html'
})

export class GtStepBodyComponent implements OnInit {
  @Input() content: TemplateRef<any>;

  @ViewChild(GtStepBodyHost) host: GtStepBodyHost;

  constructor() { }

  ngOnInit() {
    this.host.viewContainerRef.clear();
    this.host.viewContainerRef.createEmbeddedView(this.content);
  }
}
