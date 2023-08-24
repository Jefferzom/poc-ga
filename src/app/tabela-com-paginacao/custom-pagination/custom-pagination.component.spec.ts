import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { CustomPaginationComponent } from './custom-pagination.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-parent',
  template: `
    <app-custom-pagination
    [pageSizeOptions]="[5, 10, 15, 20, 100]"
    [pageSize]="5"
    [length]="10"
    ></app-custom-pagination>
  `
})
class ParentPaginatorComponent {}
describe('CustomPaginationComponent', () => {
  let component: CustomPaginationComponent;
  let fixture: ComponentFixture<CustomPaginationComponent>;
  let parentPaginatorFixture: ComponentFixture<ParentPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPaginationComponent, ParentPaginatorComponent ],
      imports: [MatPaginatorModule, MatSelectModule],
      providers: [MatPaginatorIntl, ChangeDetectorRef],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPaginationComponent);
    parentPaginatorFixture = TestBed.createComponent(ParentPaginatorComponent);
    component = fixture.componentInstance;
    parentPaginatorFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create pagination empty lengh', () => {
    component.length = 0
    component.createEllipse()
    parentPaginatorFixture.detectChanges()
    expect(component.createEllipse()).toStrictEqual([]);
  });

  it('should create pagination with 6 pages', () => {
    component.length = 30
    component.pageSize = 5
    component.createEllipse()
    parentPaginatorFixture.detectChanges()
    const shouldReturn =  [
      { page: 1, active: true },
      { page: 2, active: false },
      { page: '...', active: false },
      { page: 6, active: false }
    ]
    expect(component.createEllipse().length).toBe(4);
    expect(component.createEllipse()).toStrictEqual(shouldReturn);
  });
  it('should create pagination with 6 pages current page is 4', () => {
    component.length = 30
    component.pageIndex = 4
    component.pageSize = 5
    component.createEllipse()
    parentPaginatorFixture.detectChanges()
    const shouldReturn =  [
      { page: 1, active: false },
      { page: '...', active: false },
      { page: 4, active: false },
      { page: 5, active: true },
      { page: 6, active: false }
    ]
    expect(component.createEllipse()[3].active).toBeTruthy();
    expect(component.createEllipse()).toStrictEqual(shouldReturn);
  });


  it('should click on specifc page', () => {
    component.length = 30
    component.pageIndex = 4
    component.pageSize = 5
    fixture.detectChanges()
    const backButton = fixture.nativeElement.querySelectorAll('#gotoPage')
    backButton[0].click()
    fixture.detectChanges()
    expect(backButton).toBeTruthy();
    expect(component.pageIndex).toBe(0);
  });
  it('should click to back page', () => {
    component.length = 30
    component.pageIndex = 4
    component.pageSize = 5
    parentPaginatorFixture.detectChanges()
    const backButton = fixture.nativeElement.querySelector('#prevPage')
    backButton.click()
    fixture.detectChanges()
    expect(backButton).toBeTruthy();
    expect(component.pageIndex).toBe(3);
  });
  it('should click to next page', () => {
    component.length = 30
    component.pageIndex = 1
    component.pageSize = 5
    parentPaginatorFixture.detectChanges()
    const backButton = fixture.nativeElement.querySelector('#nextPage')
    backButton.click()
    fixture.detectChanges()
    expect(backButton).toBeTruthy();
    expect(component.pageIndex).toBe(2);
  });
});
