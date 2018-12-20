import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeisterVerwaltungComponent } from './meister-verwaltung.component';

describe('MeisterVerwaltungComponent', () => {
  let component: MeisterVerwaltungComponent;
  let fixture: ComponentFixture<MeisterVerwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeisterVerwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeisterVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
