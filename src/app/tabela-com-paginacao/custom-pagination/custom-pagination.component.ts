import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

interface CustomPageEvent extends PageEvent {
  pageEvent: string;
}

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent extends MatPaginator {
  @ViewChild('matSelect', {read: ElementRef}) matSelect!: ElementRef

  constructor(intl: MatPaginatorIntl, changeDetectorRef: ChangeDetectorRef) {
    super(intl, changeDetectorRef);
  }

  changePageSize(ev: any) {
    this._changePageSize(ev.value);
  }

  createEllipse() {
    if (this.length) {
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

        if (current > 3) {
          addEllipse();
        }

        let r1 = Math.max(current - 1, 2);
        let r2 = Math.min(current + 1, max - 1);

        for (let i = r1; i <= r2; i++) {
          addPage(i, i === current);
        }

        if (current < max - 2) {
          addEllipse();
        }

        addPage(max, max === current);
      }
      return items;
    } else {
      return [];
    }
  }


  goToPage(page: number | string): void {
    const previousPageIndex = this.pageIndex;
    this.pageIndex = +page - 1;
    this._myEmitPageEvent(previousPageIndex);
  }

  private _myEmitPageEvent(previousPageIndex?: number, action?: any) {
    const evAction = action
    const customPageEvent: CustomPageEvent = {
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
      pageEvent: evAction
    };

    this.page.emit(customPageEvent);
  }

  private scrollViewToTable() {
    const topTableFocus = document.getElementById('top-table');
    console.log(topTableFocus)
  
    if (topTableFocus) {
      topTableFocus.scrollIntoView({ behavior: 'smooth'})
    }
  }

  getEventArrow(ev?: string) {
    this._myEmitPageEvent(undefined, ev)
    this.scrollViewToTable();
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutSide(target: any) {
    const matSelectElement: HTMLElement = this.matSelect.nativeElement;

    if(matSelectElement.contains(target)) {
      matSelectElement.classList.add('move-arrow')
    } else {
      matSelectElement.classList.remove('move-arrow')
    }
  }
}
