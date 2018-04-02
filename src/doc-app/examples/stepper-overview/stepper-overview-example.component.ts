import { Component, OnInit } from '@angular/core';

/**
 * @title Stepper
 */
@Component({
  moduleId: module.id,
  selector: 'gt-stepper-overview-example',
  templateUrl: './stepper-overview-example.component.html',
  styleUrls: ['./stepper-overview-example.component.css']
})

export class StepperOverviewExampleComponent implements OnInit{
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
