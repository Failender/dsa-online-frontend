import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampagneComponent } from './kampagne.component';

describe('KampagneComponent', () => {
  let component: KampagneComponent;
  let fixture: ComponentFixture<KampagneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampagneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
