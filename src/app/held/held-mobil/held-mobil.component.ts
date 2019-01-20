import {Component} from '@angular/core';
import {HeldenService} from "../../meine-helden/helden.service";
import {HeldenComponent} from "../helden-component/helden-component.component";
import {RoutingService} from "../../shared/routing.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-held-mobil',
  templateUrl: './held-mobil.component.html',
  styleUrls: ['./held-mobil.component.css']
})
export class HeldMobilComponent extends HeldenComponent {

  public data;

  public eigenschaften = [
    {name: "mut", short: "MU"},
    {name: "klugheit", short: "KL"},
    {name: "intuition", short: "IN"},
    {name: "charisma", short: "CH"},
    {name: "fingerfertigkeit", short: "FF"},
    {name: "gewandtheit", short: "GE"},
    {name: "konstitution", short: "KO"},
    {name: "koerperkraft", short: "KK"},
    {name: "sozialstatus", short: "SO"},
    {name: "magieresistenz", short: "MR"},
    {name: "geschwindigkeit", short: "GS"}];

  public displayProbeFull = true;

  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, router, authenticationService);
  }

  init() {
    this.heldenService.getFavoriten(this.versioninfo.id)
      .pipe(map(data => {
        data.forEach(entry => entry.probeFull = this.mapProbe(entry.probe))
        return data;
      }))
      .subscribe(data => this.data = data);
  }

  addFavorite(data) {
  }

  private mapProbe(probe) {
    if(!probe || probe.indexOf('-') !== -1) {
      return null;
    }
    const splits = probe.split("/");

    const values = [];
    splits.forEach(split => {
      if(split === "**") {
        values.push(split);
        return;
      }
      const eigenschaft = this.eigenschaften.find(val => val.short === split);
      if(!eigenschaft) {
        console.error('Unrecognized split', split);
      }
      values.push(this.held.eigenschaften[eigenschaft.name].akt):
    })
    return values.join("/");
  }

  getEigenschaftsWert(name: string) {
    return this.held.eigenschaften[name].akt;
  }

  removeFavorite(data) {

    const idx = this.data.findIndex(d => d.name === data);
    this.data.splice(idx, 1);
    this.favoriteRemoved(data);
  }

}
