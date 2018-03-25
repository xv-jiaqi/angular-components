import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GtTabLabel } from './tab-label.directive';

@Component({
  moduleId: module.id,
  selector: 'gt-tab',
  templateUrl: './tab.component.html'
})
export class GtTabComponent implements OnInit {
  /**
   * @docs-private
   */
  @ContentChild(GtTabLabel) templateLabel: GtTabLabel;

  /** Tab名称 */
  @Input('label') textLabel: string;

  /**
   * @docs-private
   */
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void { }
}
