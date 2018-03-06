import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { GtTabLabel } from './tab-label.directive';
import { GtTemplatePortal } from 'get-ui-ng/utils/portal';

@Component({
  moduleId: module.id,
  selector: 'gt-tab',
  templateUrl: './tab.component.html'
})
export class GtTabComponent implements OnInit {

  private _contentPortal: GtTemplatePortal<any> | null;

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

  constructor(private _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this._contentPortal = new GtTemplatePortal(this.content, this._viewContainerRef);
  }
}
