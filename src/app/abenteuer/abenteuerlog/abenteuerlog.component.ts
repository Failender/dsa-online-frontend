import {Component, OnInit} from '@angular/core';
import {AbenteuerService} from "../abenteuer.service";
import {GruppeInfo, GruppenService} from "../../shared/gruppen.service";
import {SelectItem} from "primeng/api";
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-abenteuerlog',
  templateUrl: './abenteuerlog.component.html',
  styleUrls: ['./abenteuerlog.component.css']
})
export class AbenteuerlogComponent implements OnInit {

  public gruppen: SelectItem[];


  public loading = true;
  public canDelete: boolean;
  public abenteuer = [];
  public canEdit = false;
  private loadedGruppe = null;
  constructor(private abenteuerService: AbenteuerService, private gruppenService: GruppenService, private routingService: RoutingService) { }

  ngOnInit() {
    this.gruppenService.getCurrentGroup()
      .subscribe(gruppe => this.loadAbenteuerForGruppe(gruppe));

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

  joined(array: string[]) {
    return array.join(', ');
  }

  keys(data) {
    return Object.keys(data);
  }




}
