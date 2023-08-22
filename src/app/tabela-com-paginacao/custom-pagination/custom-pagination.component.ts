import { ChangeDetectorRef, Component} from '@angular/core';
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
  
  changePageSize(ev: any) {
    this._changePageSize(ev.value);
  }

  createEllipse() {
    let current = this.pageIndex + 1;

    const max = Math.ceil(this.length/this.pageSize);

    const items: any = [];

    const addPage = (page: any, isActive: any) => {
      items.push({ page, active: isActive });
    };

    const addEllipse = () => {
      items.push({ page: '...', active: false });
    };

    if (max <= 5) {
      for (let i = 1; i <= max; i++) {
        addPage(i, i === current);
      }
    } else {
      addPage(1, current === 1);

      if (current > 2) {
        addEllipse();
      }

      let r1 = Math.max(current - 1, 2);
      let r2 = Math.min(current + 1, max - 1);

      for (let i = r1; i <= r2; i++) {
        addPage(i, i === current);
      }

      if (current < max - 1) {
        addEllipse();
      }

      addPage(max, max === current);
    }
    return items;
  }

  hasPage(pageNumber: number):boolean {
    return pageNumber > 0 && pageNumber <= this.getNumberOfPages();
  }

  goToPage(page: number | string): void {
    if(!this.hasPage(+page)) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = +page - 1;
    this._myEmitPageEvent(previousPageIndex);
  }

  private _myEmitPageEvent(previousPageIndex: number) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
}
