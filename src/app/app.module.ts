import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabelaComPaginacaoComponent } from './tabela-com-paginacao/tabela-com-paginacao.component';

import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from './shared/shared.module';

import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CustomPaginationComponent } from './tabela-com-paginacao/custom-pagination/custom-pagination.component';
import { PaginaConsultaComponent } from './pagina-consulta/pagina-consulta.component';
import { TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TabelaComPaginacaoComponent,
    CustomPaginationComponent,
    PaginaConsultaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    SharedModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl
    },
    {
      provide: TitleCasePipe
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
