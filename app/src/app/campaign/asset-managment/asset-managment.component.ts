import { Component, OnInit } from '@angular/core';
import {Asset, AssetService} from "../../shared/assets/asset.service";
import {CampaignService} from "../campaign.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {first, flatMap, map, tap, withLatestFrom} from "rxjs/operators";
import {GruppenService} from "../../shared/gruppen.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";
import {environment} from "../../../environments/environment";
import {MessageService} from "dsa-components";

@Component({
  selector: 'app-asset-managment',
  templateUrl: './asset-managment.component.html',
  styleUrls: ['./asset-managment.component.css']
})
export class AssetManagmentComponent implements OnInit {

  public uploadUrl;
  public loading = true;
  public edit = false;
  public assets: Asset[] = [];

  public primeAssets;
  public assetHidden = false;
  public assetName = '';

  private kampagne: number;

  public selectedAssetIndex = 0;

  constructor(private assetService: AssetService, private kampagneService: CampaignService, private route: ActivatedRoute, private gruppenservice: GruppenService, private authenticationService: AuthenticationService,
              private messageService: MessageService) { }

  ngOnInit() {


    this.route.params.pipe(
      map(data => data.id),
      tap(data => this.loadAssets(data)),
      tap (data => this.uploadUrl = environment.rest + `assets/kampagne/${data}`),
      flatMap(data => this.kampagneService.getKampagne(data)),
      withLatestFrom(this.gruppenservice.getGroups().pipe(first())),
      map(([kampagne, gruppen]) => {

        const gruppe = gruppen.find(value => value.value.id === kampagne.gruppeId);
        return gruppe.value.meister;
    })
    ).subscribe(data => {
      this.edit = data;
    });


  }

  private loadAssets(kampagne) {
    this.kampagne = kampagne;
    this.assetService.assetsForKampagne(kampagne)
      .subscribe(data => {
        this.assets = data;
        this.primeAssets = data.map(entry => {
          return {
            source: `${environment.rest}assets/${entry.filename}`,
            title: entry.name
          };
        }
          )
        this.loading = false;
      });
  }

  onBeforeSend(event) {
    event.xhr.setRequestHeader('X-PASSWORD', this.authenticationService.authentication.password);
    event.xhr.setRequestHeader('X-USER', this.authenticationService.authentication.username);
    event.xhr.setRequestHeader('name', this.assetName);
    event.xhr.setRequestHeader('hidden', this.assetHidden + '');

  }

  onUpload(event) {
    this.messageService.info('Asset angelegt');
    this.loadAssets(this.kampagne);
  }

  deleteAsset() {
    this.assetService.deleteImage(this.assets[this.selectedAssetIndex].id)
      .subscribe(() => {
        this.loadAssets(this.kampagne);
        this.messageService.info('Asset gelöscht')
      });
  }

}
