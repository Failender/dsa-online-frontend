import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbenteuerErstellenComponent } from './abenteuer-erstellen.component';

describe('AbenteuerErstellenComponent', () => {
  let component: AbenteuerErstellenComponent;
  let fixture: ComponentFixture<AbenteuerErstellenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbenteuerErstellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbenteuerErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
