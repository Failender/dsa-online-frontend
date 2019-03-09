import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullImportComponent } from './full-import.component';

describe('FullImportComponent', () => {
  let component: FullImportComponent;
  let fixture: ComponentFixture<FullImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
