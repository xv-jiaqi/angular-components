import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './pagination-demo.component.html'
})
export class PaginationDemoComponent {
  pageChange(currentPage: number): void {
    alert(currentPage)
  }
}
