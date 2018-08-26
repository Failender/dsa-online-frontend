import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullExportComponent } from './full-export.component';

describe('FullExportComponent', () => {
  let component: FullExportComponent;
  let fixture: ComponentFixture<FullExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
