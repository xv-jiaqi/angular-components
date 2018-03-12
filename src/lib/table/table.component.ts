import {
  Component,
  Input,
  OnInit,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from  '@angular/core';

import { GtColumnOption } from './table';
@Component({
  moduleId: module.id,
  selector: 'gt-table',
  templateUrl: './table.component.html',
})

export class TableComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy{
  @Input() type: string;
  @Input() selected: Array<any>;
  @Input() disabledSelect: Array<any>;
  @Input() loading: boolean;
  @Input() data: Array<any>;
  @Input() columns: Array<GtColumnOption>;
  @Input() actions: Array<any>;
  @Input() expand: Array<any>;

  constructor(){ }

  ngOnInit() {

  }

  ngAfterContentInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnDestroy() {

  }

}
