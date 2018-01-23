import { Component, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { EXAMPLE_COMPONENTS, LiveExample } from '../examples/example-module';
import { ExampleHostDirective } from './example-host.directive';

@Component({
  moduleId: module.id,
  selector: 'ng5-example-view',
  templateUrl: './example-view.component.html'
})

export class ExampleViewComponent {
  private _example: string;

  exampleData: LiveExample;

  url: string;

  @Input()
  set example(value: string) {
    console.log(EXAMPLE_COMPONENTS[value]);
    if (value && EXAMPLE_COMPONENTS[value]) {
      this._example = value;
      this.exampleData = EXAMPLE_COMPONENTS[value];

      this._setComponent();
      this.url = this.exampleFileUrl('ts');
    } else {
      console.log(`MISSING EXAMPLE ${value}`);
    }
  }
  get example(): string {
    return this._example;
  }

  @ViewChild(ExampleHostDirective) exampleHost: ExampleHostDirective;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  private _setComponent(): void {
    if (!this.exampleData || !this.exampleData.component) {
      console.log(`NO COMPONENT IN EXAMPLE ${this.example}`);
      return;
    }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.exampleData.component);
    this.exampleHost.viewContainerRef.clear();
    this.exampleHost.viewContainerRef.createComponent(componentFactory);
  }

  exampleFileUrl(extension: string): string {
    return `docs/examples/${this.example.replace('-component', '')}-example.component-${extension}.html`;
  }
}
