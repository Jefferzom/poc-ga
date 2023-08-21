import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaComPaginacaoComponent } from './tabela-com-paginacao.component';

describe('TabelaComPaginacaoComponent', () => {
  let component: TabelaComPaginacaoComponent;
  let fixture: ComponentFixture<TabelaComPaginacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaComPaginacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaComPaginacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
