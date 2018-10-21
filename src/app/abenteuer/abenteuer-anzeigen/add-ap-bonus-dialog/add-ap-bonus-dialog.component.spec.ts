import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApBonusDialogComponent } from './add-ap-bonus-dialog.component';

describe('AddApBonusDialogComponent', () => {
  let component: AddApBonusDialogComponent;
  let fixture: ComponentFixture<AddApBonusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApBonusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApBonusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
