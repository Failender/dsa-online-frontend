import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResultComponent } from './table-result.component';

describe('TableResultComponent', () => {
  let component: TableResultComponent;
  let fixture: ComponentFixture<TableResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
