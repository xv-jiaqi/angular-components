import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './slider-demo.component.html'
})
export class SliderDemoComponent {
  currentValue = 46;

  disabled = false;

  hiddenMarkText = false;

  hiddenTip = false;
}
