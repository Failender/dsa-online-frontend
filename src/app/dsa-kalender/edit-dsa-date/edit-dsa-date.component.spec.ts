import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditDsaDateComponent} from './edit-dsa-date.component';

describe('EditDsaDateComponent', () => {
  let component: EditDsaDateComponent;
  let fixture: ComponentFixture<EditDsaDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDsaDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDsaDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
