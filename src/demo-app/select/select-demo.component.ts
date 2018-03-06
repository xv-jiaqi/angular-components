import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-select-demo',
  templateUrl: './select-demo.component.html',
  styleUrls: ['./select-demo.component.css']
})

export class SelectDemoComponent implements OnInit {
  private _currentIndex: number;
  constructor() { }

  ngOnInit() {
    this._currentIndex = 2;
  }
}
