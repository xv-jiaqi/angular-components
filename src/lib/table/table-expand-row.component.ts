import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
  ViewContainerRef,
  ViewChild,
  Injector,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';

@Component({
  selector: '[table-expand-row]',
  template: `
      <ng-template #expandContainer></ng-template><button (click)="ceishi()">2223666</button>
    `
})
export class TableExpandRowComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * 这一行的值
   */
  @Input() row: any;
  /**
   * 需要传入的组件
   */
  @Input() expand: any;
  /**
   * 这一行的index
   */
  @Input() rowIndex: number;

  @ViewChild('expandContainer', {read: ViewContainerRef}) expandContainer: ViewContainerRef;
  private _componentRef: ComponentRef<any>;

  constructor( private resolver: ComponentFactoryResolver) { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }
  ngAfterViewInit(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
    const cmpFactory = this.resolver.resolveComponentFactory(this.expand);
    const ctxJnjector: Injector = this.expandContainer.injector;
    this._componentRef = this.expandContainer.createComponent(cmpFactory, 0, ctxJnjector);
    const instance: any = this._componentRef.instance;
    instance['row'] = this.row;
    instance['rowIndex'] = this.rowIndex;
    console.log(instance);
    this._componentRef.changeDetectorRef.detectChanges();
  }
  ceishi() {
    console.log(this.row)
    console.log(this.rowIndex)
    this.row.expand_ = !this.row.expand_;
  }
}
