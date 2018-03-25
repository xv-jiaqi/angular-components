import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GtSelectComponent } from './select.component';

@Component({
    selector: 'gt-select-item',
    template: `
      <li class="gt-select-item" [class.select-active]="selector.compareWith(option.value)"
          (click)="itemClick()">
        <div class="gt-select-item-content">
          <span *ngIf="option.label">{{ option.label }}</span>
          <gt-select-template *ngIf="selector.itemTemplate" [data]="option" [index]="index"
                         [template]="selector.itemTemplate"></gt-select-template>
        </div>
      </li>
    `,
    styles: [`
        .select-active{
            background: #ccc;
        }
    `]
})

export class GtSelectItemComponent implements OnInit {
    @Input() option: any;
    @Input() index: number;
    @Output() onClick: EventEmitter<any> = new EventEmitter();
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
