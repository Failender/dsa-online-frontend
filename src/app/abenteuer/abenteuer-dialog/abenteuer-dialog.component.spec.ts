import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbenteuerDialogComponent } from './abenteuer-dialog.component';

describe('AbenteuerDialogComponent', () => {
  let component: AbenteuerDialogComponent;
  let fixture: ComponentFixture<AbenteuerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbenteuerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbenteuerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
