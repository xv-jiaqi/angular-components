import { Component, Directive, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { GtTemplatePortal } from './portal-base';

/**
 * @docs-private
 */
@Directive({
  selector: '[gtTabBodyHost]'
})
export class GtTabBodyHost extends GtTemplatePortal<any> {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

/**
 * @docs-private
 */
@Component({
  selector: 'gt-tab-body',
  templateUrl: './tab-body.component.html'
})
export class GtTabBodyComponent implements OnInit {

  @Input() content: TemplateRef<any>;

  @ViewChild(GtTabBodyHost) host: GtTabBodyHost;

  constructor() { }

  ngOnInit() {
    this.host.viewContainerRef.clear();
    this.host.viewContainerRef.createEmbeddedView(this.content);
  }
}
