import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GruppenService} from "../../gruppen.service";
import {CampaignService} from "../campaign.service";
import {Asset, AssetService} from "../asset.service";

@Component({
  selector: 'app-asset-selector',
  templateUrl: './asset-selector.component.html',
  styleUrls: ['./asset-selector.component.css']
})
export class AssetSelectorComponent implements OnInit, OnDestroy {

  private sub;

  public kampagnen;
  public assets: Asset[];

  @Output() public assetSelected = new EventEmitter<Asset>();
  constructor(private gruppenService: GruppenService, private kampagnenService: CampaignService, private assetService: AssetService) { }

  ngOnInit() {
    this.sub = this.gruppenService.getCurrentGroup()
      .subscribe(gruppe => {
        this.kampagnenService.getKampagnen(gruppe.id)
          .subscribe(kampagnen => this.kampagnen = kampagnen.map(entry => {
            return {
              label: entry.name,
              value: entry.id
            };
          }));
      });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onKampagneSelect(event) {
    this.assetService.assetsForKampagne(event.value)
      .subscribe(data => this.assets = data);
  }

}
