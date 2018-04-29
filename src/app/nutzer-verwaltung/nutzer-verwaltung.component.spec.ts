import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzerVerwaltungComponent } from './nutzer-verwaltung.component';

describe('NutzerVerwaltungComponent', () => {
  let component: NutzerVerwaltungComponent;
  let fixture: ComponentFixture<NutzerVerwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutzerVerwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutzerVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
