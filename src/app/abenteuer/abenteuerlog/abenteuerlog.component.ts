import { Component, OnInit } from '@angular/core';
import {AbenteuerService} from "../abenteuer.service";
import {GruppenService} from "../../meine-helden/gruppen.service";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-abenteuerlog',
  templateUrl: './abenteuerlog.component.html',
  styleUrls: ['./abenteuerlog.component.css']
})
export class AbenteuerlogComponent implements OnInit {

  public gruppen: SelectItem[];

  public abenteuer = [];

  private loadedGruppe = -1;
  constructor(private abenteuerService: AbenteuerService, private gruppenService: GruppenService) { }

  ngOnInit() {
    this.gruppenService.getGruppen()
      .subscribe( data => this.gruppen = data);
    this.loadAbenteuerForGruppe(1);
  }

  onGruppeSelect(event) {
    this.loadAbenteuerForGruppe(event.value);
  }

  loadAbenteuerForGruppe(gruppeid) {
    this.abenteuerService.getAbenteuerForGruppe(gruppeid)
      .subscribe(data => {
        this.abenteuer = data;
        this.loadedGruppe = gruppeid;
      });
  }

  joined(array: string[]) {
    return array.join(', ');
  }

  keys(data) {
    return Object.keys(data);
  }

  deleteAb(ab) {
    this.abenteuerService.deleteAbenteuer(ab.id)
      .subscribe(() => {
        this.loadAbenteuerForGruppe(this.loadedGruppe);
      });
  }

}
