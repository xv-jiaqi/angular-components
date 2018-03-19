import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'table-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <ng-container *ngFor="let action of actions" >
        <a href="#" class="gt-table__opera-link" *ngIf="!action.hidden" [innerHTML]="action.label" (click)="onCustom(action, $event)"></a>
      </ng-container>
    `
})

export class TableActionsComponent {
  /** 这一行的值 */
  @Input() row: any;
  /** 按钮配置 */
  @Input() actions: any;
  /** 列的配置 */
  @Input() columns: any;
  /** 按钮点击事件 */
  @Output() custom = new EventEmitter<any>();

  /**
   * @docs-private
   * @param action
   * @param event
   */
  onCustom(action: any, event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (action.click) {
      action.click(this.row);
    }
    if (action.needPop) {
      this.custom.emit({
        action: action.name,
        data: this.row
      })
    }
  }
}
