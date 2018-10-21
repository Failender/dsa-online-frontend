import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbenteuerTabelleComponent } from './abenteuer-tabelle.component';

describe('AbenteuerTabelleComponent', () => {
  let component: AbenteuerTabelleComponent;
  let fixture: ComponentFixture<AbenteuerTabelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbenteuerTabelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbenteuerTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
