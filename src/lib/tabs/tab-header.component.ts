import { Component, Input, OnInit } from '@angular/core';
import { GtTabType } from './tab-type';

/**
 * @docs-private
 */
@Component({
  selector: 'gt-tab-header',
  templateUrl: './tab-header.component.html'
})
export class GtTabHeaderComponent implements OnInit {
  @Input() tabType: GtTabType;

  constructor() { }

  ngOnInit() {
  }

}
