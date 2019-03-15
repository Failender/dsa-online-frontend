import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbenteuerlogComponent} from "./abenteuerlog/abenteuerlog.component";
import {AbenteuerRoutingComponent} from "./abenteuer-routing/abenteuer-routing.component";
import {AbenteuerDialogComponent} from "./abenteuer-dialog/abenteuer-dialog.component";
import {AbenteuerAnzeigenComponent} from "./abenteuer-anzeigen/abenteuer-anzeigen.component";
import {AddSeBonusDialogComponent} from "./abenteuer-anzeigen/add-se-bonus-dialog/add-se-bonus-dialog.component";
import {AddLmBonusDialogComponent} from "./abenteuer-anzeigen/add-lm-bonus-dialog/add-lm-bonus-dialog.component";
import {AddNoteBonusDialogComponent} from "./abenteuer-anzeigen/add-note-bonus-dialog/add-note-bonus-dialog.component";
import {AddApBonusDialogComponent} from "./abenteuer-anzeigen/add-ap-bonus-dialog/add-ap-bonus-dialog.component";
import {NgxMasonryModule} from "ngx-masonry";
import {TableModule} from "primeng/table";
import {AbenteuerTabelleComponent} from "../shared/tables/abenteuer-tabelle/abenteuer-tabelle.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import {ButtonModule, CheckboxModule, DropdownModule, FileUploadModule, GalleriaModule, PanelModule} from "primeng/primeng";
import {EditDsaDateModule} from "../edit-dsa-date/edit-dsa-date.module";
import {AbenteuerErstellenComponent} from "./abenteuer-erstellen/abenteuer-erstellen.component";
import {RouterModule, Routes} from "@angular/router";
import {CampaignsComponent} from "../campaign/campaigns/campaigns.component";
import {CampaignAdminComponent} from "../administration/admin-kampagne/campaign-admin.component";
import {CampaignRoutingComponent} from "../campaign/campaign-routing/campaign-routing.component";
import {CampaignComponent} from "../campaign/campaign/campaign.component";
import {CampaignDialogComponent} from "../campaign/campaign-dialog/campaign-dialog.component";
import {AssetManagmentComponent} from "../campaign/asset/asset-managment/asset-managment.component";
import {AbenteuerSharedModule} from "../shared/abenteuer/abenteuer.shared.module";

export const routes: Routes = [
  {
    path: '',
    component: AbenteuerlogComponent
  },
  {
    path: 'kampagne/erstellen',
    component: CampaignAdminComponent
  },
  {
    path: 'kampagnen/:id',
    component: CampaignRoutingComponent
  },
  {
    path: 'kampagnen/:id/assets',
    component: AssetManagmentComponent
  },

  {
    path: 'kampagnen',
    component: CampaignsComponent
  },
  {
    path: ':id',
    component: AbenteuerRoutingComponent
  }
]
@NgModule({
  declarations: [AbenteuerlogComponent, AbenteuerRoutingComponent, AbenteuerDialogComponent, AbenteuerAnzeigenComponent,
  AddSeBonusDialogComponent, AddLmBonusDialogComponent, AddNoteBonusDialogComponent, AddApBonusDialogComponent, AbenteuerTabelleComponent,
  AbenteuerlogComponent, AbenteuerErstellenComponent, AssetManagmentComponent,
    CampaignsComponent, CampaignComponent, CampaignRoutingComponent, CampaignDialogComponent, CampaignAdminComponent],
  imports: [
    CommonModule, NgxMasonryModule, TableModule, FormsModule, DialogModule, CardModule, ReactiveFormsModule, DropdownModule, EditDsaDateModule,
    RouterModule.forChild(routes), ButtonModule, PanelModule, FileUploadModule, CheckboxModule, GalleriaModule, AbenteuerSharedModule
  ],
  exports: [AbenteuerTabelleComponent, RouterModule]
})
export class AbenteuerModule { }


