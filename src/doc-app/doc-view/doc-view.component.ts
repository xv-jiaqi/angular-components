import { Component, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  moduleId: module.id,
  selector: 'ng5-doc-view',
  templateUrl: './doc-view.component.html'
})

export class DocViewComponent {
  private _exampleUrl: string;

  @Input()
  set exampleUrl(value: string) {
    this._exampleUrl = value;
    this._fetchDocument(value);
  }
  get exampleUrl(): string {
    return this._exampleUrl;
  }

  constructor(
    private _http: HttpClient,
    private _elementRef: ElementRef
  ) {}

  private _fetchDocument(url: string) {
    this._http.get(url, {
      responseType: 'text'
    }).subscribe((response) => {
      this._elementRef.nativeElement.innerHTML = response;
    });
  }
}
