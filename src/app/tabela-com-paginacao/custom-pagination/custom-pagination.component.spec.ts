import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPaginationComponent } from './custom-pagination.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';

@Component({
  template: `
    <app-custom-pagination
    [pageSizeOptions]="[5, 10, 15, 20, 100]" 
    [pageSize]="5" 
    [length]="10"
    ></app-custom-pagination>
  `
})
class ParentPaginatorComponent {
  
}
describe('CustomPaginationComponent', () => {
  let component: CustomPaginationComponent;
  let fixture: ComponentFixture<CustomPaginationComponent>;
  let parentPaginatorFixture: ComponentFixture<ParentPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPaginationComponent, ParentPaginatorComponent ],
      imports: [MatPaginatorModule],
      providers: [MatPaginatorIntl, ChangeDetectorRef],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPaginationComponent);
    parentPaginatorFixture = TestBed.createComponent(ParentPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
