import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeBonusDialogComponent } from './add-se-bonus-dialog.component';

describe('AddSeBonusDialogComponent', () => {
  let component: AddSeBonusDialogComponent;
  let fixture: ComponentFixture<AddSeBonusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeBonusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeBonusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
