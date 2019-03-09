import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAdminComponent } from './campaign-admin.component';

describe('CampaignAdminComponent', () => {
  let component: CampaignAdminComponent;
  let fixture: ComponentFixture<CampaignAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
