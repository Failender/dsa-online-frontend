import {Component, OnDestroy, OnInit} from '@angular/core';
import {GruppenService} from "../../gruppen.service";
import {CampaignService} from "../campaign.service";

@Component({
  selector: 'app-asset-selector',
  templateUrl: './asset-selector.component.html',
  styleUrls: ['./asset-selector.component.css']
})
export class AssetSelectorComponent implements OnInit, OnDestroy {

  private sub;

  public kampagnen;
  constructor(private gruppenService: GruppenService, private kampagnenService: CampaignService) { }

  ngOnInit() {
    const sub = this.gruppenService.getCurrentGroup()
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

}
