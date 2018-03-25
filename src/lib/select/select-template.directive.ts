import {
    Directive, TemplateRef, Input
} from '@angular/core';

@Directive({
    selector: '[gtTemplate]'
})
export class GtTemplateDirective {
    @Input() type: string;
    @Input('gtTemplate') name: string;

    constructor(public template: TemplateRef<any>) {
    }

    getType(): string {
        return this.name;
    }
}
