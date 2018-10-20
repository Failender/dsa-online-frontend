import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKampagneComponent } from './admin-kampagne.component';

describe('AdminKampagneComponent', () => {
  let component: AdminKampagneComponent;
  let fixture: ComponentFixture<AdminKampagneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKampagneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
