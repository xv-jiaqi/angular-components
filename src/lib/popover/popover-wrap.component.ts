import { Component, ContentChild, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GtPopoverContent } from './popover-content.directive';
import { GtPopoverRoot } from './popover-root.directive';
import { GtPopoverAlign } from './popover.align';
import { DOCUMENT } from '@angular/common';
import { GtRootPortalOutlet, GtPortalOutlet } from 'get-ui-ng/utils/portal';

@Component({
  moduleId: module.id,
  selector: 'gt-popover-wrap',
  templateUrl: './popover-wrap.component.html'
})
export class GtPopoverWrapComponent implements OnInit, OnDestroy {

  private _popContentHeight: number | null = null;

  private _popContentWidth: number | null = null;

  @ContentChild(GtPopoverContent) content: GtPopoverContent;

  @ViewChild(GtPopoverRoot) root: GtPopoverRoot;

  @ViewChild(GtPortalOutlet) outlet: GtPortalOutlet<any>;

  @ViewChild(GtRootPortalOutlet) rootOutlet: GtRootPortalOutlet;

  @Input() align: GtPopoverAlign = GtPopoverAlign.BOTTOM;

  /**
   * @docs-private
   * @type {null}
   */
  left: number | null = null;

  /**
   * @docs-private
   * @type {null}
   */
  top: number | null = null;

  /**
   * @docs-private
   */
  display: boolean;

  constructor(
    private _elementRef: ElementRef,
    @Inject(DOCUMENT) private _document: any
  ) { }

  ngOnInit(): void {
    this._elementRef.nativeElement.addEventListener('mouseenter', this._mouseIn.bind(this));
    this._elementRef.nativeElement.addEventListener('mouseleave', this._mouseOut.bind(this));
  }

  ngOnDestroy(): void {
    this.rootOutlet.dispose();
    this.outlet.dispose();
  }

  private _mouseIn(): void {
    this.display = true;
    const {left, top} = this._elementRef.nativeElement.getBoundingClientRect();
    const {offsetHeight, offsetWidth} = this._elementRef.nativeElement;

    switch (this.align) {
      case GtPopoverAlign.TOP: {
        this.left = left + offsetWidth / 2 - (this._popContentWidth || 0) / 2;
        this.top = top - (this._popContentHeight || 0) - 8;
        break;
      }
      case GtPopoverAlign.RIGHT: {
        this.left = left + offsetWidth;
        this.top = top + offsetHeight / 2 - (this._popContentHeight || 0) / 2;
        break;
      }
      case GtPopoverAlign.BOTTOM: {
        this.left = left + offsetWidth / 2 - (this._popContentWidth || 0) / 2;
        this.top = top + offsetHeight;
        break;
      }
      case GtPopoverAlign.LEFT: {
        this.left = left - (this._popContentWidth || 0) - 8;
        this.top = top + offsetHeight / 2 - (this._popContentHeight || 0) / 2;
        break;
      }
    }
  }

  private _mouseOut(): void {
    this.display = false;
  }

  /**
   * @docs-private
   * @param $event
   */
  doAttached($event) {
    setTimeout(() => {
      this._popContentWidth = $event.rootNodes[0] ? $event.rootNodes[0].offsetWidth : null;
      this._popContentHeight = $event.rootNodes[0] ? $event.rootNodes[0].offsetHeight : null;
    });
  }
}
