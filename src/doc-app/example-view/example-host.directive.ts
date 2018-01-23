import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ng5-example-host]'
})

export class ExampleHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
