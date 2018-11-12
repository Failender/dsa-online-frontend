import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampagneDialogComponent } from './kampagne-dialog.component';

describe('KampagneDialogComponent', () => {
  let component: KampagneDialogComponent;
  let fixture: ComponentFixture<KampagneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampagneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampagneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
