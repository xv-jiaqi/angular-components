import { Component, Directive, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gtTabBodyHost]'
})
export class GtTabBodyHost {
  @Input() content: TemplateRef<any>;

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }
}

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
