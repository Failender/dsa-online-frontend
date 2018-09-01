import { Component, OnInit } from '@angular/core';
import {AbenteuerService} from "../abenteuer.service";
import {GruppenService} from "../../meine-helden/gruppen.service";
import {SelectItem} from "primeng/api";
import {AuthenticationService} from "../../service/authentication/authentication.service";

@Component({
  selector: 'app-abenteuerlog',
  templateUrl: './abenteuerlog.component.html',
  styleUrls: ['./abenteuerlog.component.css']
})
export class AbenteuerlogComponent implements OnInit {

  public gruppen: SelectItem[];

  public canDelete: boolean;
  public abenteuer = [];
  public canEdit = false;
  private loadedGruppe = null;
  constructor(private abenteuerService: AbenteuerService, private gruppenService: GruppenService) { }

  ngOnInit() {
    this.gruppenService.getGruppen(true)
      .subscribe( data => this.gruppen = data);

  }

  onGruppeSelect(event) {
    this.loadAbenteuerForGruppe(event.value);
  }

  loadAbenteuerForGruppe(gruppeinfo) {
    this.abenteuerService.getAbenteuerForGruppe(gruppeinfo.id)
      .subscribe(data => {
        this.canEdit = gruppeinfo.meister;
        this.abenteuer = data.map(entry => {
          return {
            data: {
              name: entry.name,
              ap: entry.bonusAll.ap,
              id: entry.id,
              ses: this.joined(entry.bonusAll.ses)
            },
            children: Object.keys(entry.bonus).map(key => {
              return {
                data: {
                  name: key,
                  ap: entry.bonus[key].ap,
                  ses: this.joined(entry.bonus[key].ses)
                }
              };
            })
          };
        });
        this.loadedGruppe = gruppeinfo;
      });
  }

  joined(array: string[]) {
    return array.join(', ');
  }

  keys(data) {
    return Object.keys(data);
  }

  deleteEntry(node) {
    if (node.level === 0) {
      const id = node.node.data.id;
      this.abenteuerService.deleteAbenteuer(id)
        .subscribe(() => this.loadAbenteuerForGruppe(this.loadedGruppe));
    }

  }

}
