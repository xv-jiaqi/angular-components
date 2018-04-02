/**
 * 此文件后续应该从该目录抽离
 */
import {Injectable, Renderer2} from '@angular/core';

@Injectable()
export class DomRendererService {
  constructor(public renderer2: Renderer2) {}

  public listen(elem, type, handler): void {
    this.renderer2.listen(elem, type, handler);
  }
}
