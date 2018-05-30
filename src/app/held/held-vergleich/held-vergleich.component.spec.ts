import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldVergleichComponent } from './held-vergleich.component';

describe('HeldVergleichComponent', () => {
  let component: HeldVergleichComponent;
  let fixture: ComponentFixture<HeldVergleichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeldVergleichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeldVergleichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
