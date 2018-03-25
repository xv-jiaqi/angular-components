import {
  AfterContentInit, Component, ElementRef, forwardRef, Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime } from 'rxjs/operators/throttleTime';

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
export class GtSliderComponent implements ControlValueAccessor, AfterContentInit {

  /** 最小值 */
  @Input() min: number = 0;

  /** 最大值 */
  @Input() max: number = 100;

  /** 保留的小数位数 */
  @Input() fixedLength: number = 0;

  /** 隐藏底部数值标记 */
  @Input() hiddenMarkText: boolean = false;

  /** 隐藏头部当前数值的tooltip */
  @Input() hiddenTip: boolean = false;

  /**
   * @docs-private
   */
  value: number;

  /**
   * @docs-private
   */
  disabled: boolean = false;

  /**
   * @docs-private
   */
  dotLeft = 0;

  /**
   * @docs-private
   */
  viewChecked = false;

  /**
   * @docs-private
   */
  mouseDown = false;

  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

  private _onTouched: () => any = () => { };

  constructor(
    private _elementRef: ElementRef
  ) { }

  private _initPosition(): void {
    const ele = this._elementRef.nativeElement.firstChild;
    const slideWidth = ele.clientWidth;
    this.dotLeft = ((this.value || this.min) - this.min) / (this.max - this.min) * slideWidth;
  }

  ngAfterContentInit(): void {
    this._initPosition();
    this.viewChecked = true;
  }

  /**
   * @docs-private
   */
  writeValue(obj: any): void {
    if (obj === undefined || obj === null) return;
    this.value = obj;
    if (!this.viewChecked) return;
    this._initPosition();
  };

  /**
   * @docs-private
   */
  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  };

  /**
   * @docs-private
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  };

  /**
   * @docs-private
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  };

  /**
   * @docs-private
   */
  handleSlider() {
    if(this.disabled) {
      return;
    }

    this.mouseDown = true;
    const ele = this._elementRef.nativeElement.firstChild;
    // 初始位置
    const slideWidth = ele.clientWidth;
    const slideOffset = ele.getBoundingClientRect().left;

    const that = this;
    function mouseMoveHandle($event) {
      if (!that.mouseDown) {
        return;
      }

      let offset = $event.clientX - slideOffset;
      offset = offset < 0 ? 0 : offset;
      offset = offset > slideWidth ? slideWidth : offset;
      that.dotLeft = offset;

      that.value = +((that.max - that.min) * offset / slideWidth + that.min).toFixed(that.fixedLength); // handle的标注精确数值
      that._controlValueAccessorChangeFn(that.value);
    }

    const mouseMoveStream = fromEvent(document, 'mousemove');
    const eventStream = mouseMoveStream.pipe(throttleTime(10));
    const listener = eventStream.subscribe(mouseMoveHandle);

    function mouseUpHandle() {
      that.mouseDown = false;
      listener.unsubscribe();
      document.removeEventListener('mouseup', mouseUpHandle);
    }

    document.addEventListener("mouseup", mouseUpHandle);
  }
}
