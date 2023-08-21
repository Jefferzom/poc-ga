import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericService } from './service/generic.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  displayedColumns: any = [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'nome',
      label: 'Nome'
    }
  ];

  public subscriptions: Subscription[] = []
  public tableData: any = []

  public indexPage: number = 1;
  public pageSize: number = 5;

  constructor(public pocGeneric: GenericService) {}
  
  ngOnInit(): void {
    this.getContracts(1, 5)
  }

  getContracts(pageIndex: number, pageSize: number) {
    this.subscriptions.push(
      // this.pocGeneric.getDataWithPagination(pageIndex, pageSize).subscribe((res: any) => {
      //   this.tableData = res
      // })

      this.pocGeneric.getData().subscribe((res: any) => {
        this.tableData = res
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe)
  }

  getEmitedPageEvent(ev: any) {
    this.pageSize = ev.pageSize
    this.indexPage = ev.pageIndex
    this.getContracts(ev.pageIndex, ev.pageSize)
  }
}
