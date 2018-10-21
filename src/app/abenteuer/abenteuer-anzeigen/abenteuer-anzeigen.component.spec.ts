import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbenteuerAnzeigenComponent } from './abenteuer-anzeigen.component';

describe('AbenteuerAnzeigenComponent', () => {
  let component: AbenteuerAnzeigenComponent;
  let fixture: ComponentFixture<AbenteuerAnzeigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbenteuerAnzeigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbenteuerAnzeigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
