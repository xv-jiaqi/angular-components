import {
  Component, Input, Output, Renderer2,
  EventEmitter, ElementRef, ViewChild, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GtCheckboxComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'gt-checkbox',
  template: `
    <label [ngClass]="'gt-checkbox'" [class]="styleClass"
           [class.gt--disabled]="disabled" #container>
      <input type="checkbox" value="{{value}}" [disabled]="disabled"
             [checked]="checked" name="{{name}}" (change)="onCheckboxChange($event, label)">
      <span class="gt-checkbox__style"></span>
      <span class="gt-checkbox__txt">{{ label }}</span>
    </label>
  `,
  styleUrls: ['./checkbox.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class GtCheckboxComponent implements ControlValueAccessor {
  checkedValue: any;
  _checked: boolean;

  @Input() name: string;
  @Input() label: string;

  @Input()
  set checked(value: boolean) {
    console.log('checked', value);
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
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;

  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public renderer2: Renderer2) {
    this.checkedValue = [];
  }

  writeValue(value: any) {
    console.log('writeValue', value);
    if (value) {
      this.checkedValue = value;
      if (!this.returnBoolean && !Array.isArray(this.checkedValue)) {
        this.checkedValue = [value];
      }
      this.checked = this.isChecked();
    }
  }

  isChecked() {
    console.log('isChecked', this.returnBoolean,this.checkedValue);
    if (this.returnBoolean) {
      return this.checkedValue;
    }
    return this.checkedValue.indexOf(this.value) !== -1;
  }

  removeValue() {
    console.log('removeValue', this.returnBoolean);
    if (this.returnBoolean) {
      this.checkedValue = this.checked;
      return;
    }
    this.checkedValue = this.checkedValue.filter(val => val !== this.value);
  }

  addValue() {
    console.log('addValue', this.checkedValue);
    if (this.isChecked()) {
      return;
    }
    if (this.checkedValue) {
      this.checkedValue = [...this.checkedValue, this.value];
    } else {
      this.checkedValue = [this.value];
    }
  }

  registerOnChange(fn: Function) {
    console.log('registerOnChange', fn);
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    console.log('registerOnTouched', fn);
    this.onTouchedChange = fn;
  }

  onCheckboxChange(e: any, label: string) {
    console.log('onCheckboxChange', e, label);
    if (!this.disabled) {
      this.checked = e.target.checked;
      if (!this.returnBoolean) {
        if (this.checked) {
          this.addValue();
        } else {
          this.removeValue();
        }
        this.onModelChange(this.checkedValue);
      } else {
        this.onModelChange(this.checked);
      }
      this.onChange.emit(this.checked);
    }
  }
}
