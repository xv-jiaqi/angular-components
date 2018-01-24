import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-component-view',
  templateUrl: './component-view.component.html',
  styleUrls: ['./component-view.component.less']
})
export class GtComponentViewComponent {
  @Input() apiUrl: string;

  @Input() markdownUrl: string;
}
