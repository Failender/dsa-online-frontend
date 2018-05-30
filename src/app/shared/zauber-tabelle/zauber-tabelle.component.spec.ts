import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZauberTabelleComponent } from './zauber-tabelle.component';

describe('ZauberTabelleComponent', () => {
  let component: ZauberTabelleComponent;
  let fixture: ComponentFixture<ZauberTabelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZauberTabelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZauberTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
