import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentHeldComponent } from './current-held.component';

describe('CurrentHeldComponent', () => {
  let component: CurrentHeldComponent;
  let fixture: ComponentFixture<CurrentHeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentHeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentHeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
