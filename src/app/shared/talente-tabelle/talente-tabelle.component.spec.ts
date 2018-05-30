import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalenteTabelleComponent } from './talente-tabelle.component';

describe('TalenteTabelleComponent', () => {
  let component: TalenteTabelleComponent;
  let fixture: ComponentFixture<TalenteTabelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalenteTabelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalenteTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
