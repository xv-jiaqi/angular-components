import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { GtColumnOption } from './table';

@Component({
  selector: '[table-cell]',
  template: `
    <ng-container *ngIf="!column.component"> 
      <span>{{ getFormattedValue() }} </span>
    </ng-container>
    <ng-template *ngIf="column.component" #cmpContainer></ng-template>
  `
})
export class TableCellComponent implements AfterViewInit, OnDestroy {
  /**
   * 这一行的值
   */
  @Input() row: any;
  /**
   * 这一列的配置
   */
  @Input() column: GtColumnOption;
  @ViewChild('cmpContainer', {read: ViewContainerRef}) cmpContainer: ViewContainerRef;

  private _componentRef: ComponentRef<any>;

  constructor( private resolver: ComponentFactoryResolver ){}

  getValue(): any{
    return this.row[this.column.field];
  }

  getFormattedValue(): any {
    if (this.column.formatter) {
      return this.column.formatter(this.getValue(), this.row, this.column);
    }
    return this.getValue();
  }

  ngAfterViewInit(): void {
    if (this.column.component) {
      if (this._componentRef) {
        this._componentRef.destroy();
      }
      const cmpFactory = this.resolver.resolveComponentFactory(this.column.component);
      const ctxJnjector: Injector = this.cmpContainer.injector;
      this._componentRef = this.cmpContainer.createComponent(cmpFactory, 0, ctxJnjector);
      const instance: any = this._componentRef.instance;
      instance['row'] = this.row;
      instance['column'] = this.column;
      instance['field'] = this.column.field;
      instance['value'] = this.getValue();
      this._componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }

}
