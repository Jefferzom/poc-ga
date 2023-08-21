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

  get displayedPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalPages = Math.ceil(this.length / this.pageSize);
  
    if (totalPages <= this.maxDisplayedPages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfMax = Math.floor(this.maxDisplayedPages / 2);
      const lowerBound = Math.max(0, this.pageIndex - halfMax);
      const upperBound = Math.min(totalPages - 1, this.pageIndex + halfMax);
  
      if (lowerBound > 0) {
        pages.push(0);
        if (lowerBound > 1) {
          pages.push('...');
        }
      }
  
      for (let i = lowerBound; i <= upperBound; i++) {
        pages.push(i);
      }
  
      if (upperBound < totalPages - 1) {
        if (upperBound < totalPages - 2) {
          pages.push('...');
        }
        pages.push(totalPages - 1);
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
