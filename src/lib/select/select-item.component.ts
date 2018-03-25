import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { GtSelectComponent } from './select.component';

@Component({
    selector: 'gt-select-item',
    template: `
      <li class="gt-select-item" [ngClass]="{'select-active': _active || selector.compareWith(option.value)}"
          (click)="itemClick()">
        <div class="gt-select-item-content">
          <span *ngIf="option.label">{{ option.label }}/{{ selector.compareWith(option.value) }}</span>
          <gt-select-template *ngIf="selector.itemTemplate" [data]="option" [index]="index"
                         [template]="selector.itemTemplate"></gt-select-template>
        </div>
      </li>
    `,
    styles: [`
        .select-active{
            background-color: #ccc;
            cursor: pointer;
        }
    `]
})

export class GtSelectItemComponent implements OnInit {
    _active: boolean;
    @Input() option: any;
    @Input() index: number;
    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @HostListener('mouseover') onMouseover() {
        this._active = true;
    }

    @HostListener('mouseleave') onMouseleave() {
        this._active = false;
    }

    selector: GtSelectComponent;

    constructor(selector: GtSelectComponent) {
        this.selector = selector;
    }

    ngOnInit() {
        this.selector.addGroup(this);
    }

    itemClick() {
        this.onClick.emit(this.option);
    }
}
