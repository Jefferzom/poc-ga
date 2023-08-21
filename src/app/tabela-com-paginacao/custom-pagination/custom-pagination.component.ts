type spread = '...';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent extends MatPaginator {
  constructor(intl: MatPaginatorIntl, changeDetectorRef: ChangeDetectorRef) {
    super(intl, changeDetectorRef);
  }
  public maxDisplayedPages = 4;
  
  changePageSize(ev: any) {
    this._changePageSize(ev.value);
    this.length = Math.ceil(this.length/this.pageSize);
  }

  get displayedPages(): (number | spread) [] {
    const pages: (number | spread)[] = [];
    const halfMax = Math.floor(this.maxDisplayedPages / 2);

    if (this.length <= this.maxDisplayedPages) {
      for (let i = 0; i < this.length; i++) {
        pages.push(i);
      }
    } else {
      if (this.pageIndex + 1 <= halfMax) {
        for (let i = 0; i < this.maxDisplayedPages - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.length - 1);
      } else if (this.pageIndex >= this.length - 1 - halfMax) {
        pages.push(0);
        pages.push('...');
        for (let i = this.length - this.maxDisplayedPages + 1; i < this.length; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push('...');
        for (let i = this.pageIndex - halfMax + 1; i <= this.pageIndex + halfMax - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.length - 1);
      }
    }

    return pages;
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number') {
      this.pageIndex = page;
    }
  }
}
