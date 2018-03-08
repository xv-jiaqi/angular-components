import { Component } from '@angular/core';

/**
 * @title Slider
 */
@Component({
  moduleId: module.id,
  templateUrl: './slider-overview-example.component.html',
  styleUrls: ['./slider-overview-example.component.css']
})
export class SliderOverviewExampleComponent {
  currentValue = 40;

  disabled = false;

  hiddenMarkText = false;

  hiddenTip = false;
}
