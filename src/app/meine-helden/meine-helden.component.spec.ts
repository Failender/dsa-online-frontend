import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeineHeldenComponent } from './meine-helden.component';

describe('MeineHeldenComponent', () => {
  let component: MeineHeldenComponent;
  let fixture: ComponentFixture<MeineHeldenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeineHeldenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeineHeldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
