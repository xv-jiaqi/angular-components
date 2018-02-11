import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gt-bar',
  templateUrl: './bar.component.html'
})
export class GtBarComponent implements OnInit {
  @Input() label: string;

  @ViewChild(TemplateRef) content: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
