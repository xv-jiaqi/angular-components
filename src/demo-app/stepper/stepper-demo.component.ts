import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-stepper-demo',
  templateUrl: './stepper-demo.component.html',
  styleUrls: ['./stepper-demo.component.css']
})

export class StepperDemoComponent implements OnInit {
  private _currentIndex: number;
  constructor() { }

  ngOnInit() {
    this._currentIndex = 2;
  }

  prevStep() {
    this._currentIndex -= 1;
  }

  nextStep() {
    this._currentIndex += 1;
  }
}
