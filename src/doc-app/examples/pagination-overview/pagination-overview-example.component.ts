import { Component } from '@angular/core';

/**
 * @title Pagination
 */
@Component({
  moduleId: module.id,
  templateUrl: './pagination-overview-example.component.html',
  styleUrls: ['./pagination-overview-example.component.css']
})
export class PaginationOverviewComponent {
  currentIndex = 5;

  pageChange(index: number) {
    this.currentIndex = index;
  }
}
