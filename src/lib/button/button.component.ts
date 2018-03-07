import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-button',
  template: `
    <button [ngClass]="_buttonClass"
            [type]="type"
            [ngStyle]="{'gt--disabled': _disabled}"
            [disabled]="_disabled">{{ label }}</button>
    `,
  styleUrls: ['./button.component.css']
})
export class GtButtonComponent implements OnInit {
  _buttonClass = 'gt-btn-solid';
  _disabled = false;

  @Input()
  set disabled(val: boolean | string) {
    this._disabled = typeof val === 'boolean' ? val : Boolean(val);
  }

  get disabled() {
    return this._disabled;
  }

  @Input() size: string;

  @Input() label = '按钮';

  @Input() type: string;
  // primary(default theme) error(red) warning(yellow) success(green) simple(gt-btn-line gt--secondary)

  constructor() { }

  ngOnInit() {
    switch (this.type) {
      case 'error': this._buttonClass = `${this._buttonClass} gt--error`; break;
      case 'warning': this._buttonClass = `${this._buttonClass} gt--warning`; break;
      case 'success': this._buttonClass = `${this._buttonClass} gt--success`; break;
      case 'simple': this._buttonClass = 'gt-btn-line'; break;
    }

    switch (this.size) {
      case 'small': this._buttonClass = `${this._buttonClass} gt--small`; break;
      case 'large': this._buttonClass = `${this._buttonClass} gt--large`; break;
    }

  }
}
