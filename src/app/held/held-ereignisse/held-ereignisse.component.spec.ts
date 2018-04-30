import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldEreignisseComponent } from './held-ereignisse.component';

describe('HeldEreignisseComponent', () => {
  let component: HeldEreignisseComponent;
  let fixture: ComponentFixture<HeldEreignisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeldEreignisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeldEreignisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
