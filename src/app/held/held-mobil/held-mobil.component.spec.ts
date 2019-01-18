import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeldMobilComponent} from './held-mobil.component';

describe('HeldMobilComponent', () => {
  let component: HeldMobilComponent;
  let fixture: ComponentFixture<HeldMobilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeldMobilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeldMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
