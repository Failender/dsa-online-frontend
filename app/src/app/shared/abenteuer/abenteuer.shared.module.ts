import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetService} from "./asset.service";
import {CampaignService} from "./campaign.service";
import {AssetSelectorComponent} from "./asset-selector/asset-selector.component";
import {DropdownModule, GalleriaModule, PanelModule} from "primeng/primeng";
import {AssetGaleryComponent} from './asset-galery/asset-galery.component';

@NgModule({
  declarations: [AssetSelectorComponent, AssetGaleryComponent],
  imports: [
    CommonModule, DropdownModule, GalleriaModule, PanelModule
  ],
  exports: [AssetSelectorComponent],
  providers: [AssetService, CampaignService]
})
export class AbenteuerSharedModule { }
