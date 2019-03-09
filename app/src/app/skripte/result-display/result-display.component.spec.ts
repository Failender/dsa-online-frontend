import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDisplayComponent } from './result-display.component';

describe('ResultDisplayComponent', () => {
  let component: ResultDisplayComponent;
  let fixture: ComponentFixture<ResultDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
