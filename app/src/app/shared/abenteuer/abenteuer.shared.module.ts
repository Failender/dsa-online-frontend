import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetService} from "./asset.service";
import {CampaignService} from "./campaign.service";
import {AssetSelectorComponent} from "./asset-selector/asset-selector.component";
import {DropdownModule} from "primeng/primeng";

@NgModule({
  declarations: [AssetSelectorComponent],
  imports: [
    CommonModule, DropdownModule
  ],
  exports: [AssetSelectorComponent],
  providers: [AssetService, CampaignService]
})
export class AbenteuerSharedModule { }
