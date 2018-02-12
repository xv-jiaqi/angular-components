import { AfterViewChecked, AfterViewInit, Component, Input } from '@angular/core';

/**
 * 设定模态框距离顶部的高度
 */
function setMarginTop () {
  const windowHeight = window.innerHeight;
  const modalArray = document.querySelectorAll('.gt-modal__content');
  for (let i = 0; i < modalArray.length; i++) {
    const modalHeight = modalArray[i].scrollHeight;
    let modalMarginTop = 0;
    windowHeight - modalHeight > 0 ? modalMarginTop = (windowHeight - modalHeight) / 2 : modalMarginTop = 20;
    modalArray[i]['style'].marginTop = modalMarginTop + 'px';
  }
}

/**
 * 节流函数，用于缩放时调用，提高性能
 * @param method
 * @param context
 */
function throttle (method, context?: any) {
  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context);
  }, 20);
}

/**
 * resize
 */
function resize () {
  throttle(setMarginTop);
}

@Component({
  moduleId: module.id,
  selector: 'gt-modal-wrap',
  templateUrl: './modal-wrap.component.html'
})

export class GtModalWrapComponent implements AfterViewInit, AfterViewChecked {
  private _showShadow = true;

  private _showAnimation = true;

  private _modalClass = 'gt-open-modal';

  private _dialogOpen = false;

  private _timer: number | null = null;

  @Input() set showShadow (value: boolean) {
    this._showShadow = value === null || value === undefined ? true : value;
  }

  get showShadow (): boolean {
    return this._showShadow;
  }

  @Input() set showAnimation (value: boolean) {
    this._showAnimation = value === null || value === undefined ? true : value;
  }

  get showAnimation (): boolean {
    return this._showAnimation;
  }

  display = 'none';

  gtIn = false;

  constructor () {}

  ngAfterViewInit () {
    if (window['attachEvent']) {
      window['attachEvent']('onresize', resize);
    } else {
      window.addEventListener('resize', resize, false);
    }
  }

  ngAfterViewChecked () {
    if (this._dialogOpen) {
      /** ngAfterViewChecked必须异步执行，因为angular不允许在视图检查完成之后同步更改组件状态 **/
      // 清除上次的异步事件
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timer = setTimeout(() => {
        if (this.showAnimation && !this.gtIn) {
          this.gtIn = true;
        }
      });
      setMarginTop();
    }
  }

  openModal () {
    let bodyClass = document.body.getAttribute('class');
    if (!bodyClass) {
      bodyClass = '';
    }
    bodyClass += ` ${this._modalClass}`;
    document.body.setAttribute('class', bodyClass);
    this.display = 'block';
    this._dialogOpen = true;
  }

  closeModal (): Promise<any> {
    const that = this as GtModalWrapComponent;
    return new Promise(resolve => {
      function _closeModal () {
        that.display = 'none';
        let bodyClass = document.body.getAttribute('class') || '';
        const bodyClassArr = bodyClass.split(' ');
        const index = bodyClassArr.indexOf(that._modalClass);
        if (index > -1) {
          bodyClassArr.splice(index, 1);
        }
        bodyClass = bodyClassArr.join(' ');
        document.body.setAttribute('class', bodyClass);

        if (window['detachEvent']) {
          window['detachEvent']('onresize', resize);
        } else {
          window.removeEventListener('resize', resize, false);
        }
        resolve();
      }

      /** 由于在ngAfterViewChecked生命周期的钩子里面注册了一个异步事件，因此在更改状态之前需要先把异步事件清空，
          否则在改完状态之后还会执行之前注册的异步事件，导致状态更改失效 **/
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._dialogOpen = false;
      this.gtIn = false;

      if (this.showAnimation) {
        setTimeout(() => {
          _closeModal();
        }, 300);
      } else {
        setTimeout(() => {
          _closeModal();
        }, 0);
      }
    });
  }
}
