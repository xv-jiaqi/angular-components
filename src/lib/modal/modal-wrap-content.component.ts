import { Component } from '@angular/core';

@Component({
  selector: 'gt-modal-header',
  template: '<div class="gt-modal__header"><ng-content></ng-content></div>'
})

export class GtModalWrapHeaderContentComponent { }

@Component({
  selector: 'gt-modal-body',
  template: '<div class="gt-modal__body"><ng-content></ng-content></div>'
})

export class GtModalWrapBodyContentComponent { }

@Component({
  selector: 'gt-modal-footer',
  template: '<div class="gt-modal__footer"><ng-content></ng-content></div>'
})

export class GtModalWrapFooterContentComponent { }
