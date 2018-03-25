
import {
    Component, OnInit, OnDestroy, Input, ViewContainerRef, EmbeddedViewRef
} from '@angular/core';

@Component({
    selector: 'gt-select-template',
    template: ``
})

export class GtTemplateComponent implements OnInit, OnDestroy {

    @Input() template: any;
    @Input() index: any;
    @Input() data: any;
    view: EmbeddedViewRef<any>;

    constructor(public _viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        if (this.template) {
            this.view = this._viewContainerRef.createEmbeddedView(this.template, {
                '\$implicit': this.data,
                'index': this.index
            });
        }
    }

    ngOnDestroy() {
        if (this.view) {
            this.view.destroy();
        }
    }
}
