import {Component} from '@angular/core';
import {HeldenService} from "../../meine-helden/helden.service";
import {HeldenComponent} from "../helden-component/helden-component.component";
import {RoutingService} from "../../shared/routing.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";

@Component({
  selector: 'app-held-mobil',
  templateUrl: './held-mobil.component.html',
  styleUrls: ['./held-mobil.component.css']
})
export class HeldMobilComponent extends HeldenComponent {

  public data;

  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, router, authenticationService);
  }

  init() {
    this.heldenService.getFavoriten(this.versioninfo.id)
      .subscribe(data => this.data = data);
  }

  addFavorite(data) {

  }

  removeFavorite(data) {

    const idx = this.data.findIndex(d => d.name === data);
    console.debug(idx);
    this.data.splice(idx, 1);
    this.favoriteRemoved(data);
  }

}
