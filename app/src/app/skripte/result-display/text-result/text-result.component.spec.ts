import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextResultComponent } from './text-result.component';

describe('TextResultComponent', () => {
  let component: TextResultComponent;
  let fixture: ComponentFixture<TextResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
