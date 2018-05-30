import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EreignisseTabelleComponent } from './ereignisse-tabelle.component';

describe('EreignisseTabelleComponent', () => {
  let component: EreignisseTabelleComponent;
  let fixture: ComponentFixture<EreignisseTabelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EreignisseTabelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EreignisseTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
