import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GtActionOtion
} from './table';

@Component({
  selector: 'table-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <ng-container *ngFor="let action of actions" >
        <ng-container  *ngIf="!isHidden(action)">
          <a href="#" class="gt-table__opera-link" *ngIf="!isDisabled(action)" [innerHTML]="action.label" (click)="onCustom(action, $event)"></a>
          <span class="disabled no-wrap" *ngIf="isDisabled(action)" [innerHTML]="action.label"></span>
        </ng-container>
      </ng-container>
    `
})

export class TableActionsComponent {
  /** 这一行的值 */
  @Input() row: any;
  /** 按钮配置 */
  @Input() actions: GtActionOtion[];
  /** 列的配置 */
  @Input() columns: any;
  /** 按钮点击事件 */
  @Output() custom = new EventEmitter<any>();

  /**
   * @docs-private
   */
  onCustom(action: GtActionOtion, event: any): void{
    event.preventDefault();
    event.stopPropagation();
    if (action.click) {
      action.click(this.row);
    }
  }

  /**
   * @docs-private
   */
  isHidden(action: GtActionOtion): boolean {
    if (action.hidden) {
      if (this._isFunction(action.hidden)) {
        return action.hidden(this.row);
      }
      return action.hidden;
    }
    return false;
  }

  /**
   * @docs-private
   */
  isDisabled(action: GtActionOtion): boolean {
    if (action.disabled) {
      if (this._isFunction(action.disabled)) {
        return action.disabled(this.row);
      }
      return action.disabled;
    }
    return false;
  }

  private _isFunction(val: any): boolean {
    return val && Object.prototype.toString.call(val) === '[object Function]';
  }
}
