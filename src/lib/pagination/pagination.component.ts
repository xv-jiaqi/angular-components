import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gt-pagination',
  templateUrl: './pagination.component.html',
})
export class GtPaginationComponent implements OnInit {
  private _total: number;

  /** 当前页索引 */
  @Input() page: number;

  /** 每页显示条数 */
  @Input() size: number;

  /** 显示的页码总数 */
  @Input() showPageNum = 7;

  /** 总条数 */
  @Input() set total (value: number) {
    this._total = value;
    this.pageCount = Math.ceil(this.total / this.size) || 1;
    this.pages = this._getPages();
  }
  get total(): number {
    return this._total;
  }

  /** 页码更改事件 */
  @Output() pageChange = new EventEmitter();

  /**
   * @docs-private
   * @type {boolean}
   */
  showPrevMore = false;

  /**
   * @docs-private
   * @type {boolean}
   */
  showNextMore = false;

  /**
   * @docs-private
   * @type {number}
   */
  pageCount = 0;

  /**
   * @docs-private
   * @type {any[]}
   */
  pages: number[] = [];

  /**
   * @docs-private
   * @type {boolean}
   */
  pageError = false;

  /**
   * @docs-private
   * @returns {number[]}
   * @private
   */
  private _getPages () {
    let start: number;
    let end: number;
    const pagers: number[] = [];

    this.showPrevMore = false;
    this.showNextMore = false;

    if (this.pageCount > this.showPageNum) {
      if (this.page > this.showPageNum - 3) {
        this.showPrevMore = true;
      }
      if (this.page < this.pageCount - 3) {
        this.showNextMore = true;
      }
    }

    const offset = this.showPageNum - 4;
    if (this.showPrevMore && !this.showNextMore) {
      end = this.pageCount - 1;
      start = end - offset;
    } else if (!this.showPrevMore && this.showNextMore) {
      start = 3;
      end = start + offset;
    } else if (this.showPrevMore && this.showNextMore) {
      const mid = Math.floor((this.showPageNum - 3) / 2);
      start = this.page - mid;
      end = start + offset;
    } else {
      start = 3;
      end = this.pageCount - 1;
    }

    for (let i = start; i <= end; i++) {
      pagers.push(i);
    }
    return pagers;
  }

  /**
   * @docs-private
   * @param page
   */
  checkLegal (page) {
    /** check if is a positive number */
    if (!/[1-9][0-9]*/.test(page)) {
      this.pageError = true;
      return;
    }

    /** check if larger than pageCount */
    if (this.pageCount < page) {
      this.pageError = true;
      return;
    }

    this.pageError = false;
  }

  /**
   * @docs-private
   * @param page
   */
  go (page) {
    if (this.page !== +page) {
      this.page = +page;
      this.pageChange.emit(this.page);
      this.pages = this._getPages();
    }
  }

  ngOnInit (): void {
    this.page = this.page || 1;
    /** if not set size throw error */
    if (!this.size) {
      throw new Error('must set size property and value cannot be 0');
    }
  }
}
