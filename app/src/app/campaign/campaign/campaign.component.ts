import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../../shared/abenteuer/campaign.service";
import {flatMap} from "rxjs/operators";
import {GruppenService} from "../../shared/gruppen.service";
import {AbenteuerService} from "../../abenteuer/abenteuer.service";

@Component({
  selector: 'app-kampagne',
  templateUrl: './campaign-component.html',
  styleUrls: ['./campaign-component.css']
})
export class CampaignComponent implements OnInit {


  @Input()
  public set kampagne(kampagne: number) {
    if (!kampagne) {
      return;
    }
    this.kampagnenService.getKampagne(kampagne)
      .subscribe(data => {
        this.kampagneData = data;
        this.onKampagneLoaded();
      });
  }

  @Output()
  public kampagneLoaded = new EventEmitter();

  public kampagneData;
  public canEdit = false;
  public abenteuer = [];

  constructor(private activatedRoute: ActivatedRoute, private kampagnenService: CampaignService, private gruppenService: GruppenService,
              private abenteuerService: AbenteuerService) { }

  ngOnInit() {

  }

  private onKampagneLoaded() {
    this.kampagneLoaded.next(this.kampagneData);
    this.canEdit = this.gruppenService.hasEditRight(this.kampagneData.gruppeId);

    this.abenteuerService.getAbenteuerForKampagne(this.kampagneData.id)
      .subscribe(data => this.abenteuer = data);
  }

}
