import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbenteuerlogComponent } from './abenteuerlog.component';

describe('AbenteuerlogComponent', () => {
  let component: AbenteuerlogComponent;
  let fixture: ComponentFixture<AbenteuerlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbenteuerlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbenteuerlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
