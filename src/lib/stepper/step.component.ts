import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { GtTemplatePortal } from 'get-ui-ng/utils/portal';

@Component({
  moduleId: module.id,
  selector: 'gt-step',
  templateUrl: './step.component.html'
})

export class GtStepComponent implements OnInit {
  private _contentPortal: GtTemplatePortal<any> | null;

  /** step 名称 每一步的名称 */
  @Input('label') labelText: string;

  /** Symbol名称 圆圈内的文案 */
  @Input('symbol') symbolText: string;

  /** description 每一步的描述 */
  @Input() description: string;

  /**
   * @docs-private
   */
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  constructor(private _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this._contentPortal = new GtTemplatePortal(this.content, this._viewContainerRef);
  }
}
