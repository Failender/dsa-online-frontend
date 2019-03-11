import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbenteuerService} from "../abenteuer.service";
import {GruppeInfo, GruppenService} from "../../shared/gruppen.service";
import {SelectItem} from "primeng/api";
import {RoutingService} from "dsa-components";

@Component({
  selector: 'app-abenteuerlog',
  templateUrl: './abenteuerlog.component.html',
  styleUrls: ['./abenteuerlog.component.css']
})
export class AbenteuerlogComponent implements OnInit, OnDestroy {

  public gruppen: SelectItem[];

  @Input()
  public kampagne;

  public loading = true;
  public canDelete: boolean;
  public abenteuer = [];
  public canEdit = false;
  private loadedGruppe = null;

  private sub;
  constructor(private abenteuerService: AbenteuerService, private gruppenService: GruppenService, private routingService: RoutingService) { }

  ngOnInit() {
    if(this.kampagne) {
      this.loadAbenteuerForKampagne(this.kampagne);
    } else {
      this.sub = this.gruppenService.getCurrentGroup()
        .subscribe(gruppe => this.loadAbenteuerForGruppe(gruppe));

    }

  }



  loadAbenteuerForGruppe(gruppeinfo: GruppeInfo) {
    this.loading = true;
    this.abenteuerService.getAbenteuerForGruppe(gruppeinfo.id)
      .subscribe(data => {
        this.canEdit = gruppeinfo.meister;
        this.abenteuer = data;
        this.loadedGruppe = gruppeinfo;
        this.loading = false;
      });
  }

  loadAbenteuerForKampagne(kampagne: number) {
    this.loading = true;
    this.abenteuerService.getAbenteuerForKampagne(kampagne)
      .subscribe(data => {
        this.canEdit = false;
        this.abenteuer = data;
        this.loading = false;
      });
  }

  joined(array: string[]) {
    return array.join(', ');
  }

  keys(data) {
    return Object.keys(data);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }




}
