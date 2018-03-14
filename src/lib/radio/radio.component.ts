import {
  NgModule, Component, Input, Output, ElementRef,
  EventEmitter, forwardRef, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const GT_CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GtRadioComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'gt-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [GT_CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class GtRadioComponent implements ControlValueAccessor {

  /**
   * @docs-private
   */
  checked: boolean;

  /** 设置单选框的名称，可选 */
  @Input() name: string;

  /** 自定义文本，可选 */
  @Input() label: string;

  /** 设置单选框value值，可选 */
  @Input() value: string;

  /** 是否禁用，默认为false，可选 */
  @Input() disabled: boolean;
  
  /** 点击事件 输出属性 */
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  /**
   * @docs-private
   */
  @ViewChild('rb') inputViewChild: ElementRef;

  /**
   * @docs-private
   */
  onModelChange: Function = () => { };

  /**
   * @docs-private
   */
  onTouchChange: Function = () => { };

  constructor(private cd: ChangeDetectorRef) { }
  
  /**
   * @docs-private
   */
  writeValue(value: any): void {
    if (value) {
      this.checked = (value === this.value);
      if (this.inputViewChild.nativeElement) {
        this.inputViewChild.nativeElement.checked = this.checked;
      }
      this.cd.markForCheck();
    }
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
    this.onTouchChange = fn;
  }

  /**
  * @docs-private
  */
  select() {
    const eleInput = this.inputViewChild.nativeElement;
    if (!this.disabled) {
      eleInput.checked = !eleInput.checked;
      this.checked = !this.checked;
      if (this.checked) {
        this.onModelChange(this.value);
      } else {
        this.onModelChange(null);
      }
      this.onClick.emit({
        name: eleInput.name,
        value: eleInput.value,
        checked: this.checked
      });
    }
  }
}
