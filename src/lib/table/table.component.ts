import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from  '@angular/core';

import {
  GtOnCheckedRowOption,
  GtOnExpandRowOption,
  GtActionOtion,
  GtSortOption,
  GtColumnOption,
  GtTableClassFunc,
  GtTableStyleFunc,
  GT_SORT_ORDER
} from './table';

const sortCycle: GT_SORT_ORDER[] = ['asc', 'desc', undefined];
const getNextSortOrder: Function = (currentSortOrder: GT_SORT_ORDER): GT_SORT_ORDER =>  {
  const nextIndex: number = (sortCycle.indexOf(currentSortOrder) + 1) % sortCycle.length;
  return sortCycle[nextIndex];
};

@Component({
  moduleId: module.id,
  selector: 'gt-table',
  templateUrl: './table.component.html',
})

export class TableComponent implements OnInit, OnChanges{

  /** 表格额外 class 比如 gt-table--hover */
  @Input() specialClass: string = '';

  /** 表格类型 */
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
  @Input() actions: GtActionOtion[];

  /** 点击列展开的组件 */
  @Input() expand: any[];

  /** 勾选取消勾选的事件 */
  @Output() onCheckedRow: EventEmitter<GtOnCheckedRowOption> = new EventEmitter();

  /** 展开某一行的事件 */
  @Output() onExpandRow: EventEmitter<GtOnExpandRowOption> = new EventEmitter();

  /** 排序信息改变事件 */
  @Output() onSortStateChange: EventEmitter<GtSortOption> = new EventEmitter();

  /**
   * 选择的关键key
   * @docs-private
   *
   */
  id: any;

  /** @docs-private */
  colspanVal: number = 0;

  /** @docs-private */
  isCheckedAll: boolean = false;

  /** @docs-private */
  isChecked: symbol = Symbol('isChecked');

  /**
   * 是否禁用了全部
   * @docs-private
   * @type {boolean}
   */
  isDisableCheckedAll: boolean = false;

  /**
   * @docs-private
   * 排序状态信息
   */
  sortStack: any = {};

  constructor(){ }

  ngOnChanges(): void {
    if (this.type.indexOf('select') !== -1) {
      this.id = this.type.split('.')[1];
      this.data.forEach((iteam: any) => {
        if (this.selected.indexOf(iteam[this.id]) == -1) {
          iteam[this.isChecked] = false;
        } else {
          iteam[this.isChecked] = true;
        }
      });
      this.isCheckedAll = this._isAllChecked();
    }
    this.colspanVal = this.colspan();
  }
  ngOnInit() {}

  /** @docs-private */
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

  /** @docs-private */
  clickRow(row: any, rowIndex: number): void {
    row.expand_ = !row.expand_;
    this.onExpandRow.emit({rowIndex, row});
  }

  /** @docs-private */
  columnHeaderClick(event: any, column: GtColumnOption): void {
    event.stopPropagation();
    event.preventDefault();
    if (column.sort) {
      this.toggleSort(column);
    }
  }

  /** @docs-private */
  toggleSort(column: any): void {
    this.columns.forEach((_column) => {
      if (_column !== column) {
        _column.sortOrder = undefined;
      }
    });
    column.sortOrder = getNextSortOrder(column.sortOrder);
    this.sortStack = {};
    if (column.sortOrder) {
      const sortKey = column['sortKey']?column['sortKey']: column['field'];
      this.sortStack[sortKey] = column.sortOrder;
    }
    this.onSortStateChange.emit({sort: this.sortStack});
  }

  /**
   * @docs-private
   * @param event
   */
  toggleAll(event: any): void {
    event.stopPropagation();
    this.isCheckedAll = !this.isCheckedAll;
    console.log(event)
    this.data.forEach( row => {
      if (this.isDisabled(row)) {
        return;
      }
      row[this.isChecked] = this.isCheckedAll;
      if (this.isCheckedAll) {
        this._checkRow(row);
      } else {
        let _index = this.selected.indexOf(row[this.id]);
        this.selected.splice(_index, 1);
      }
    });
    const selected = this.selected;
    this.onCheckedRow.emit({selected});
  }

  /**
   * @docs-private
   * 点击单行执行
   */
  toggleRow(row: any, event: any): void {
    event.stopPropagation();
    row[this.isChecked] = !row[this.isChecked];
    let _index = this.selected.indexOf(row[this.id]);
    if (row[this.isChecked] && !~_index) {
      this.selected.push(row[this.id]);
    } else if (!row[this.isChecked] && ~_index) {
      this.selected.splice(_index, 1);
    }
    this.isCheckedAll = this._isAllChecked();
    const selected = this.selected;
    this.onCheckedRow.emit({selected, row});
  }

  protected _isAllChecked(): boolean {
    return this.data.every( row => {
       return this._isCheckedRow(row) || this.isDisabled(row);
    })
  }

  protected _isCheckedRow(row: any): boolean {
    let _index = this.selected.indexOf(row[this.id]);
    return !~_index? false: true;
  }

  protected _checkRow(row: any): void{
    let _index = this.selected.indexOf(row[this.id]);
    if (row[this.isChecked] && _index == -1) {
      this.selected.push(row[this.id]);
    }
  }

  /** @docs-private */
  isAllDisabled(): boolean {
    return this.data.every( row => {
      return this.isDisabled(row);
    })
  }

  /** @docs-private */
  isDisabled(row: any): boolean {
    let _index = this.disabledSelect?this.disabledSelect.indexOf(row[this.id]): -1;
    return !!~_index;
  }

  /**
   * @docs-private
   * @param row
   * @param cell
   * @param column
   * @returns {string}
   */
  getColumnClass(row: any, cell: any, column: GtColumnOption): string {
    if (typeof column.class === 'string') {
      return <string>column.class;
    } else if (typeof column.class === 'function'){
      return (<GtTableClassFunc>column.class)(row, cell);
    }
    return '';
  }

  /**
   * @docs-private
   * @param row
   * @param cell
   * @param column
   * @returns {}
   */
  getColumnStyle(row: any, cell: any, column: GtColumnOption): Object {
    if (typeof column.style === 'object') {
      return column.style;
    } else if (typeof column.style === 'function'){
      return (<GtTableStyleFunc>column.style)(row, cell);
    }
    return {};
  }

}
