import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-checkbox-demo',
  templateUrl: './checkbox-overview-example.component.html',
  styleUrls: ['./checkbox-overview-example.component.css']
})

export class CheckboxOverviewComponent implements OnInit {
  key1 = true;
  key2 = [1];

  constructor() {
  }

  ngOnInit() {

  }

  getChange(e: boolean) {
    console.log(e);
  }
}
