import {
  Component, Input, Output, Renderer2,
  EventEmitter, ElementRef, ViewChild, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
  _checkedValue: any;
  _checked: boolean;

  @Input() name: string;
  @Input() label: string;

  @Input()
  set checked(value: boolean) {
    this._checked = value;
    if (!this.returnBoolean) {
      if (value) {
        this.addValue();
      } else {
        this.removeValue();
      }
    }
  }

  get checked() {
    return this._checked;
  }

  @Input() disabled: boolean;
  @Input() value: any;
  @Input() styleClass: string;
  @Input() returnBoolean: boolean;
  @Output() onChange = new EventEmitter();
  @ViewChild('container') container: ElementRef;

  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public renderer: Renderer2) {
    this._checkedValue = [];
  }

  writeValue(value: any) {
    if (value) {
      this._checkedValue = value;
      if (!this.returnBoolean && !Array.isArray(this._checkedValue)) {
        this._checkedValue = [value];
      }
      this.checked = this.isChecked();
    }
  }

  isChecked() {
    if (this.returnBoolean) {
      return this._checkedValue;
    }
    return this._checkedValue.indexOf(this.value) !== -1;
  }

  removeValue() {
    if (this.returnBoolean) {
      this._checkedValue = this.checked;
      return;
    }
    this._checkedValue = this._checkedValue.filter(val => val !== this.value);
  }

  addValue() {
    if (this.isChecked()) {
      return;
    }
    this._checkedValue = this._checkedValue ? [...this._checkedValue, this.value] : [this.value];
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  onCheckboxChange(e: any) {
    if (!this.disabled) {
      this.checked = e.target.checked;
      if (!this.returnBoolean) {
        if (this.checked) {
          this.addValue();
        } else {
          this.removeValue();
        }
        this.onModelChange(this._checkedValue);
      } else {
        this.onModelChange(this.checked);
      }
      this.onChange.emit(this.checked);
    }
  }
}
