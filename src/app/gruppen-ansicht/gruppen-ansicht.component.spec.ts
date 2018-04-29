import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppenAnsichtComponent } from './gruppen-ansicht.component';

describe('GruppenAnsichtComponent', () => {
  let component: GruppenAnsichtComponent;
  let fixture: ComponentFixture<GruppenAnsichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppenAnsichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppenAnsichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
