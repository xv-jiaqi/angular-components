import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gt-example-host]'
})

export class ExampleHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
