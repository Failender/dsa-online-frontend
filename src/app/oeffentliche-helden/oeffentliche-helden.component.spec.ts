import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OeffentlicheHeldenComponent } from './oeffentliche-helden.component';

describe('OeffentlicheHeldenComponent', () => {
  let component: OeffentlicheHeldenComponent;
  let fixture: ComponentFixture<OeffentlicheHeldenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OeffentlicheHeldenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OeffentlicheHeldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
