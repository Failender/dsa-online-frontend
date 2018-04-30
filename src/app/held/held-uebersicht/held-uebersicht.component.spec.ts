import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldUebersichtComponent } from './held-uebersicht.component';

describe('HeldUebersichtComponent', () => {
  let component: HeldUebersichtComponent;
  let fixture: ComponentFixture<HeldUebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeldUebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeldUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
