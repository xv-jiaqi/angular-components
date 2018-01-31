import {
  Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList,
  ViewEncapsulation
} from '@angular/core';
import { GtTabComponent } from './tab.component';
import { GtTabType } from './tab-type';

@Component({
  selector: 'gt-tab-group',
  templateUrl: './tab-group.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GtTabGroupComponent implements OnInit {

  private _selectedIndex: number = 0;
  /** 当前选中索引的默认值 */
  @Input() set selectedIndex(value: number) {
    this._selectedIndex = value;
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  private _tabType: GtTabType = GtTabType.LINE;
  /** Tab类型，默认为LINE */
  @Input() set tabType(value: GtTabType) {
    this._tabType = value;
  }
  get tabType(): GtTabType {
    return this._tabType;
  }

  /** 选中的索引更改事件 */
  @Output() selectedIndexChange: EventEmitter<number> = new EventEmitter();

  /**
   * @docs-private
   */
  @ContentChildren(GtTabComponent) tabs: QueryList<GtTabComponent>;

  constructor() { }

  ngOnInit() { }

  /**
   * @docs-private
   */
  setSelectedIndex(index: number) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }

}
