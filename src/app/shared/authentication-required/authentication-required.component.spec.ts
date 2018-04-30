import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRequiredComponent } from './authentication-required.component';

describe('AuthenticationRequiredComponent', () => {
  let component: AuthenticationRequiredComponent;
  let fixture: ComponentFixture<AuthenticationRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
