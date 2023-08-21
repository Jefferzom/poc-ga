import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'table-pagination',
  templateUrl: './tabela-com-paginacao.component.html',
  styleUrls: ['./tabela-com-paginacao.component.scss']
})
export class TabelaComPaginacaoComponent implements OnInit, OnChanges {
  @ViewChild('paginator') paginator!: MatPaginator
  dataSource = new MatTableDataSource<any>()

  @Input() data!: any;
  @Input() columns!: any[];
  @Input() showTotalPages!: number;
  public columnNames!: any[]
  public keyName!: any[]
  @Input() lengthPagination!: number;
  @Input() sizePage!: number;
  @Input() indexPage!: number;
  @Input() paginationType: 'front' | 'back' = 'front';
  @Input() hasPagination: boolean = false;

  @Output() emitPageEvent = new EventEmitter<PageEvent>

  pageSize: number = 15;
  pageIndex = 0
  
  ngOnInit(): void {
    this.columnNames = this.columns.map((res: any) => res.label);
    this.keyName = this.columns.map((res: any) => res.key);
  }

  getTextPaginator(page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return 'Sem resultados'
    }
    return page + 1 + '-' + pageSize + ' de ' + length;
  }

  onPageChange(event: any): void {
    const indexPage = event.pageIndex + 1
    Object.assign(event, {
      pageIndex: indexPage,
      previousPageIndex: indexPage - 1
    })
    this.emitPageEvent.emit(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.pageSize = this.sizePage
    this.pageIndex = this.indexPage
    if (this.paginationType === 'front') {
      this.dataSource.paginator = this.paginator
    }
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.paginator.length = this.lengthPagination
    });
  }

}
