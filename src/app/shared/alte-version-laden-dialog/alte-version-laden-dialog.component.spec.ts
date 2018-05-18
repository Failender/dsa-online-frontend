import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteVersionLadenDialogComponent } from './alte-version-laden-dialog.component';

describe('AlteVersionLadenDialogComponent', () => {
  let component: AlteVersionLadenDialogComponent;
  let fixture: ComponentFixture<AlteVersionLadenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteVersionLadenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteVersionLadenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
