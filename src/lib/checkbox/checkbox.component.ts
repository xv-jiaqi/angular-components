import {
  Component, Input, Output, Renderer2,
  EventEmitter, ElementRef, ViewChild, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const GT_CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GtCheckboxComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'gt-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [GT_CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class GtCheckboxComponent implements ControlValueAccessor {
  /**
   * @docs-private
   */
  private _checkedValue: any;

  /**
  * @docs-private
  */
  private _checked: boolean;

  /** 设置多选框的名称，可选 */
  @Input() name: string;

  /** 自定义文本，可选 */
  @Input() label: string;

  /** 是否选中，可选 */
  @Input()
  set checked(value: boolean) {
    this._checked = value;
    if (!this.returnBoolean) {
      if (value) {
        this._addValue();
      } else {
        this._removeValue();
      }
    }
  }

  get checked() {
    return this._checked;
  }

  /** 是否禁用，可选 */
  @Input() disabled: boolean;

  /** 设置多选框value值，可选 */
  @Input() value: any;

  /** 自定义样式，可选 */
  @Input() styleClass: string;

  /** 是否返回布尔值，可选 */
  @Input() returnBoolean: boolean;

  /** 多选框值更改事件 */
  @Output() onChange = new EventEmitter();

  /**
   * @docs-private
   */
  onModelChange: Function = () => { };

  /**
   * @docs-private
   */
  onTouchedChange: Function = () => { };

  constructor(public renderer: Renderer2) {
    this._checkedValue = [];
  }

  /**
   * @docs-private
   */
  writeValue(value: any): void {
    if (value) {
      this._checkedValue = value;
      if (!this.returnBoolean && !Array.isArray(this._checkedValue)) {
        this._checkedValue = [value];
      }
      this.checked = this._isChecked();
    }
  }

  /**
   * @docs-private
   */
  _isChecked(): any {
    if (this.returnBoolean) {
      return this._checkedValue;
    }
    return this._checkedValue.indexOf(this.value) !== -1;
  }

  /**
   * @docs-private
   */
  private _removeValue(): void {
    if (this.returnBoolean) {
      this._checkedValue = this.checked;
      return;
    }
    this._checkedValue = this._checkedValue.filter(val => val !== this.value);
  }

  /**
   * @docs-private
   */
  private _addValue(): void {
    if (this._isChecked()) {
      return;
    }
    this._checkedValue = this._checkedValue ? [...this._checkedValue, this.value] : [this.value];
  }

  /**
   * @docs-private
   */
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  /**
   * @docs-private
   */
  registerOnTouched(fn: Function): void {
    this.onTouchedChange = fn;
  }

  /**
   * @docs-private
   */
  onCheckboxChange(e: any): void {
    if (!this.disabled) {
      this.checked = e.target.checked;
      if (!this.returnBoolean) {
        if (this.checked) {
          this._addValue();
        } else {
          this._removeValue();
        }
        this.onModelChange(this._checkedValue);
      } else {
        this.onModelChange(this.checked);
      }
      this.onChange.emit(this.checked);
    }
  }
}
