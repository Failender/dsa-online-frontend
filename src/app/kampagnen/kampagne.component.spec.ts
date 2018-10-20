import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampagnenComponent } from './kampagnen.component';

describe('KampagnenComponent', () => {
  let component: KampagnenComponent;
  let fixture: ComponentFixture<KampagnenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampagnenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampagnenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
