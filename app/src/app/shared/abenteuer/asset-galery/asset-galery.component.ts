import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Asset} from "../asset.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-asset-galery',
  templateUrl: './asset-galery.component.html',
  styleUrls: ['./asset-galery.component.css']
})
export class AssetGaleryComponent implements OnChanges{

  @Input() public assets: Asset[];

  @Output() public assetSelected = new EventEmitter<Asset>();

  public primeAssets = [];
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.assets) {
      if(this.assets && this.assets.length !== 0) {
        this.assetSelected.next(this.assets[0]);
        this.primeAssets = this.assets.map(entry => {
          return {
            source: `${environment.rest}assets/${entry.filename}`,
            title: entry.name
          };
        })
      } else {
        this.primeAssets = [];
        this.assetSelected.next(null);
      }
    }
  }

  onAssetSelected(index) {
    this.assetSelected.next(this.assets[index]);
  }

}
