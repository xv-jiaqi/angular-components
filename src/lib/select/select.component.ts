import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component, OnInit, Input, EventEmitter,
  Output, ViewChild, ElementRef, Renderer2, forwardRef, OnDestroy,
  ContentChildren, QueryList, AfterContentInit
} from '@angular/core';

import { deepEqual } from './../utils/common';

import { GtTemplateComponent } from './select-template.component';
import { GtTemplateDirective } from './select-template.directive';
import { GtSelectItemComponent } from './select-item.component';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GtSelectComponent),
  multi: true
};

@Component({
  selector: 'gt-select',
  template: `
    <div>
      <div (click)="onClick()">
        <label *ngIf="value">{{ value }}</label>
        <label *ngIf="!value">{{ pholder }}</label>
      </div>
      <div *ngIf="opened" (click)="onMenuClick()">
        <div *ngIf="filter">
          <div>
            <input #filterInput type="text" [(ngModel)]="_filterValue" (input)="onFilterChange($event)">
          </div>
        </div>

        <div>
          <ul>
            <gt-select-item
              *ngFor="let option of filterValue(options, 'label'); index as i"
              (onClick)="onItemClick($event)" [option]="option" [index]="i"></gt-select-item>
          </ul>
        </div>

      </div>
    </div>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class GtSelectComponent implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy {
  @Input() pholder = '请选择';
  @Input() editable: boolean;
  @Input() filter = true;
  @Input() selected: any;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('filterInput') input: ElementRef;

  @Input()
  get options(): any {
    return this._options;
  }

  set options(value: any) {
    this._options = value;
  }

  _options: any;
  opened: boolean;
  _filterValue: any;
  value: string;
  itemClick: boolean;
  items: GtSelectItemComponent[] = [];
  selfClick: boolean;
  bindDocumentClickListener: Function | null;
  itemTemplate: any;
  templates: any;
  @ContentChildren(GtTemplateDirective) tempalateDirective: QueryList<GtTemplateDirective>;
  onModelChange: Function = () => { };
  onTouchedChange: Function = () => { };

  constructor(public renderer: Renderer2) {
    this.onDocumentClickListener();
  }

  ngOnInit() {
    if (this.pholder) {
      this.value = this.pholder;
    }
  }

  ngAfterContentInit() {
    this.templates = this.tempalateDirective.toArray();
    for (const temp of this.templates) {
      switch (temp.getType()) {
        case 'item':
          this.itemTemplate = temp.template;
          break;
      }
    }
  }

  writeValue(value: any) {
    if (value) {
      this.selected = value;
      this.getValue();
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  compareWith(value: string) {
    let isEqual;
    if (value && this.selected) {
      if (Array.isArray(this.selected)) {
        for (const o of this.selected) {
          isEqual = deepEqual(value, o['value']);
          break;
        }
      } else {
        isEqual = deepEqual(value, this.selected.value);
      }
    }
    return isEqual;
  }

  onItemClick($event) {
    this.itemClick = $event;
    this.selected = $event;
    this.value = $event.label;
    this.getSelectedValue();
    this.close();
  }

  getValue() {
    this.value = '';
    const selectedValue: any[] = [];
    if (Array.isArray(this.selected)) {
      for (const s of this.selected) {
        selectedValue.push(s.label);
      }
      this.value = selectedValue.join(',');
    } else if (this.selected) {
      this.value = this.selected.label;
    }
  }

  getSelectedValue() {
    this.getValue();
    this.onModelChange(this.selected);
    this.onChange.emit(this.selected);
  }

  onFilterChange(event: any) {
  }

  addGroup(value: GtSelectItemComponent) {
    this.items.push(value);
  }

  onMenuClick() {
    this.itemClick = true;
  }

  onDocumentClickListener() {
    if (!this.bindDocumentClickListener) {
      this.bindDocumentClickListener = this.renderer.listen('body', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.close();
        }
        this.itemClick = false;
        this.selfClick = false;
      });
    }
  }

  offDocumentClickListener() {
    if (this.bindDocumentClickListener) {
      this.bindDocumentClickListener();
      this.bindDocumentClickListener = null;
    }
  }

  onClick() {
    if (!this.editable) {
      if (!this.opened) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  filterValue(options: any[], value: string) {
    if (this.filter && options && Array.isArray(options)) {
      return options.filter((v, k, arr) => {
        const regexp = new RegExp(this._filterValue, 'ig');
        if (regexp.test(v[value])) {
          return true;
        }
      });
    }
    return options;
  }

  open() {
    this.selfClick = true;
    this.opened = true;
  }

  close() {
    this.opened = false;
    this.selfClick = false;
  }

  ngOnDestroy() {
    this.offDocumentClickListener();
  }

}
