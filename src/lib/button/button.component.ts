import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class GtButtonComponent implements OnInit {
  /**
  * @docs-private
  */
  buttonClass = 'gt-btn-solid';

  /**
  * @docs-private
  */
  disabledStatus = false;

  /** 是否禁用，可选 */
  @Input()
  set disabled(val: boolean | string) {
    this.disabledStatus = typeof val === 'boolean' ? val : Boolean(val);
  }

  get disabled() {
    return this.disabledStatus;
  }

  /** 尺寸，可选 */
  @Input() size: string;

  /** 自定义文本，可选 */
  @Input() label = '按钮';

  /**
   * 按钮主题，可选
   * primary(default theme) error(red) warning(yellow) success(green) simple(gt-btn-line gt--secondary)
   */
  @Input() type: string;

  constructor() { }

  ngOnInit() {
    switch (this.type) {
      case 'error': this.buttonClass = `${this.buttonClass} gt--error`; break;
      case 'warning': this.buttonClass = `${this.buttonClass} gt--warning`; break;
      case 'success': this.buttonClass = `${this.buttonClass} gt--success`; break;
      case 'simple': this.buttonClass = 'gt-btn-line'; break;
    }

    switch (this.size) {
      case 'small': this.buttonClass = `${this.buttonClass} gt--small`; break;
      case 'large': this.buttonClass = `${this.buttonClass} gt--large`; break;
    }

  }
}
