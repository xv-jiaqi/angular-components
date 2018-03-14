import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-checkbox-demo',
  templateUrl: './checkbox-demo.component.html',
  styleUrls: ['./checkbox-demo.component.css']
})

export class CheckboxDemoComponent implements OnInit {
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
