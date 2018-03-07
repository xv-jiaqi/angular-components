import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Provider Expression that allows gt-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const GT_SLIDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GtSliderComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'gt-slider',
  templateUrl: './slider.component.html',
  providers: [GT_SLIDER_CONTROL_VALUE_ACCESSOR]
})
export class GtSliderComponent implements ControlValueAccessor {

  @Input() min: number = 0;

  @Input() max: number = 0;

  @Input() fixedLength: number = 0;

  @Input() value: number;

  @Output() input: EventEmitter<number> = new EventEmitter<number>();

  disabled: boolean = false;

  dotLeft = 0;

  mouseDown = false;

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

  private _onTouched: () => any = () => { };

  constructor(
    public elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  /**
   * Writes a new value to the element.
   *
   * This method will be called by the forms API to write to the view when programmatic
   * (model -> view) changes are requested.
   *
   * Example implementation of `writeValue`:
   *
   * ```ts
   * writeValue(value: any): void {
     *   this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
     * }
   * ```
   */
  writeValue(obj: any): void {
    this.value = obj;
  };

  /**
   * Registers a callback function that should be called when the control's value
   * changes in the UI.
   *
   * This is called by the forms API on initialization so it can update the form
   * model when values propagate from the view (view -> model).
   *
   * If you are implementing `registerOnChange` in your own value accessor, you
   * will typically want to save the given function so your class can call it
   * at the appropriate time.
   *
   * ```ts
   * registerOnChange(fn: (_: any) => void): void {
     *   this._onChange = fn;
     * }
   * ```
   *
   * When the value changes in the UI, your class should call the registered
   * function to allow the forms API to update itself:
   *
   * ```ts
   * host: {
     *    (change): '_onChange($event.target.value)'
     * }
   * ```
   *
   */
  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  };

  /**
   * Registers a callback function that should be called when the control receives
   * a blur event.
   *
   * This is called by the forms API on initialization so it can update the form model
   * on blur.
   *
   * If you are implementing `registerOnTouched` in your own value accessor, you
   * will typically want to save the given function so your class can call it
   * when the control should be considered blurred (a.k.a. "touched").
   *
   * ```ts
   * registerOnTouched(fn: any): void {
     *   this._onTouched = fn;
     * }
   * ```
   *
   * On blur (or equivalent), your class should call the registered function to allow
   * the forms API to update itself:
   *
   * ```ts
   * host: {
     *    '(blur)': '_onTouched()'
     * }
   * ```
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  };

  /**
   * This function is called by the forms API when the control status changes to
   * or from "DISABLED". Depending on the value, it should enable or disable the
   * appropriate DOM element.
   *
   * Example implementation of `setDisabledState`:
   *
   * ```ts
   * setDisabledState(isDisabled: boolean): void {
     *   this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
     * }
   * ```
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  };

  handleSlider() {
    this.mouseDown = true;
    const ele = this.elementRef.nativeElement.firstChild;

    // 初始位置
    const slideWidth = ele.clientWidth;

    this.dotLeft = (this.value / (this.max - this.min) - this.min) * slideWidth;
    const slideOffset = ele.getBoundingClientRect().left;

    if(this.disabled) {
      return;
    }

    const that = this;
    function mouseMoveHandle($event) {
      if (!that.mouseDown) {
        return;
      }

      let offset = $event.clientX - slideOffset;
      offset = offset < 0 ? 0 : offset;
      offset = offset > slideWidth ? slideWidth : offset;
      that.dotLeft = offset;

      that.value = that.min + +((that.max - that.min) * offset / slideWidth).toFixed(that.fixedLength); // handle的标注精确数值
      that.input.emit(that.value);
      that._controlValueAccessorChangeFn(that.value);
    }

    function mouseUpHandle() {
      that.mouseDown = false;
      document.removeEventListener('mousemove', mouseMoveHandle);
      document.removeEventListener('mouseup', mouseUpHandle);
    }

    document.addEventListener("mouseup", mouseUpHandle);

    document.addEventListener('mousemove', mouseMoveHandle);
  }
}
