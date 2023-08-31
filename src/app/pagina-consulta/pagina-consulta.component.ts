import { Subscription } from 'rxjs';
import { ConsultService } from './../service/consult.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagina-consulta',
  templateUrl: './pagina-consulta.component.html',
  styleUrls: ['./pagina-consulta.component.scss']
})
export class PaginaConsultaComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private consultService: ConsultService) {}
  public contract: any;
  public subscriptions: Subscription[] = []
  public preloading: boolean = true
  public errorInService: boolean = false;
  public pageSize: number = 5
  public indexPage: number = 1

  ngOnInit(): void {
    this.displayContracts()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe)
  }

  displayContracts() {
    this.subscriptions.push(
      this.consultService
      .getContracts()
      .subscribe({
        next: (response: any) => {
          this.contract = response;
          this.contract.pagination.size = 25
          // this.handleActionsContracts(this.contract.contracts)
          this.preloading = false;
        },
        error: _ => {
          this.preloading = false;
          this.errorInService = true;
        },
        complete() {
          // this.preloading = false;
        }
      })
    )
  }

  ngAfterViewInit(): void {
    this.displayContracts();
  }

  retry() {
    this.displayContracts()
  }

  handlePaginatorEvent(ev: PageEvent) {
    this.pageSize = ev.pageSize
    this.indexPage = ev.pageIndex
  }
}
