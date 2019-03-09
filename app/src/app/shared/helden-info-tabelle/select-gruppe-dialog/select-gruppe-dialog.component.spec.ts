import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGruppeDialogComponent } from './select-gruppe-dialog.component';

describe('SelectGruppeDialogComponent', () => {
  let component: SelectGruppeDialogComponent;
  let fixture: ComponentFixture<SelectGruppeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGruppeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGruppeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
