import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gt-tab',
  templateUrl: './tab.component.html'
})
export class GtTabComponent implements OnInit {
  /** Tab名称 */
  @Input() label: string;

  /**
   * @docs-private
   */
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
