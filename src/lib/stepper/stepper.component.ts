import { Component, OnInit, QueryList, ContentChildren, Input } from '@angular/core';
import { GtStepComponent } from './step.component';

@Component({
  moduleId: module.id,
  selector: 'gt-stepper',
  templateUrl: './stepper.component.html'
})

export class GtStepperComponent implements OnInit {
  private _currentIndex: number = 0;
  /** 当前step的index */
  @Input('current') set currentIndex(value: number) {
    this._currentIndex = value;
  }
  get currentIndex(): number {
    return this._currentIndex;
  }

  /**
   * @docs-private
   */
  @ContentChildren(GtStepComponent) steps: QueryList<GtStepComponent>;

  ngOnInit () {}
}
