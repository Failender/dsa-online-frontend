import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsaKalenderComponent } from './dsa-kalender.component';

describe('DsaKalenderComponent', () => {
  let component: DsaKalenderComponent;
  let fixture: ComponentFixture<DsaKalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaKalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsaKalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
