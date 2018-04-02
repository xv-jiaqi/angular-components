import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'expand-demo',
  template: `{{row.id}}`
})
export class ExpandDemoComponent implements OnInit {
  @Input() row: any;
  @Input() column: any;
  constructor() { }

  ngOnInit() {
    console.log(this.row, 'this.row')
  }

}
