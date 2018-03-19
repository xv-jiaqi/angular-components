import {
  Component,
  Input,
  OnInit,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
  OnDestroy, Output, EventEmitter
} from  '@angular/core';

import {
  GtOnCheckedRowOption,
  GtOnExpandRowOption
} from './table';


import { GtColumnOption } from './table';
@Component({
  moduleId: module.id,
  selector: 'gt-table',
  templateUrl: './table.component.html',
})

export class TableComponent implements OnInit, OnChanges{

  @Input() type: string = 'select.id';
  /** 是否显示序号 */
  @Input() ordinal: boolean = true;

  /** 已经选中的数组 */
  @Input() selected: any[] = [];

  /** 不可选中项 */
  @Input() disabledSelect: any[];

  /** 加载状态 */
  @Input() loading: boolean;

  /** 显示的结构化数据 */
  @Input() data: any[];

  /** 表格列的配置描述 */
  @Input() columns: GtColumnOption[];

  /** 表格的操作 */
  @Input() actions: any[];

  /** 点击列展开的组件 */
  @Input() expand: any[];

  /** 勾选取消勾选的事件 */
  @Output() onCheckedRow: EventEmitter<GtOnCheckedRowOption> = new EventEmitter();

  /** 展开某一行的事件 */
  @Output() onExpandRow: EventEmitter<GtOnExpandRowOption> = new EventEmitter();

  /**
   * @docs-private
   * 选择的关键key
   */
  id: any;
  colspanVal: number = 0;
  isCheckedAll: boolean = false;
  isDisableCheckedAll: boolean = false;
  constructor(){ }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.type.indexOf('select') !== -1) {
      this.id = this.type.split('.')[1];
    }

    this.data.forEach((iteam: any) => {
      if (this.selected.indexOf(iteam[this.id]) == -1) {
        iteam.isChecked = false;
      } else {
        iteam.isChecked = true;
      }
    });
    this.colspanVal = this.colspan();
  }
  ngOnInit() {

  }

  colspan(): number {
    let cols = this.columns.length + 1;
    if (this.actions) {
      cols++;
    }
    if (this.type.indexOf('select') !== -1) {
      cols++;
    }
    return cols;
  }

  clickRow(row: any, rowIndex: number): void {
    row.expand_ = !row.expand_;
    this.onExpandRow.emit({rowIndex, row});
  }

  toggleAll(event: any): void {
    event.stopPropagation();
    this.isCheckedAll = !this.isCheckedAll;
    if (this.isCheckedAll) {
      this.data.forEach( row => {
        row.isChecked = true;
        this._checkRow(row);
      })
    } else {
      this.data.forEach( row => {
        row.isChecked = false;
        this.selected = [];
      })
    }
    const selected = this.selected;
    this.onCheckedRow.emit({selected});
  }

  /**
   * @docs-private
   * 点击单行执行
   */
  toggleRow(row: any, event: any): void {
    event.stopPropagation();
    row.isChecked = !row.isChecked;
    let _index = this.selected.indexOf(row[this.id]);
    if (row.isChecked && !~_index) {
      this.selected.push(row[this.id]);
    } else if (!row.isChecked && ~_index) {
      this.selected.splice(_index, 1);
    }
    this.isCheckedAll = this._isAllChecked();

    const selected = this.selected;
    this.onCheckedRow.emit({selected, row});

  }

  private _isAllChecked(): boolean{
    return this.data.every( row => {
       return this._isCheckedRow(row);
    })
  }

  private _isCheckedRow(row: any): boolean {
    let _index = this.selected.indexOf(row[this.id]);
    return !~_index? false: true;
  }

  private _checkRow(row: any): void{
    let _index = this.selected.indexOf(row[this.id]);
    if (row.isChecked && _index == -1) {
      this.selected.push(row[this.id]);
    }
  }

  getColumnClass(row: any, val: any, column: any): string {
    if (column.class) {
      if (this._isFunction(column.class)) {
        return column.class(row, val);
      } else {
        return column.class;
      }
    }
    return '';
  }
  getColumnStyle(row: any, val: any, column: any): Object {
    if (column.style) {
      if (this._isFunction(column.style)) {
        return column.style(row, val);
      } else {
        return column.style;
      }
    }
    return {};
  }

  private _isFunction(val: any): boolean {
    return val && Object.prototype.toString.call(val) === '[object Function]';
  }

}
