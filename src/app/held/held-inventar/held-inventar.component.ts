import {Component} from '@angular/core';
import {HeldenComponent} from "../helden-component/helden-component.component";
import {HeldenService} from "../../meine-helden/helden.service";
import {RoutingService} from "../../shared/routing.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";

@Component({
  selector: 'app-held-inventar',
  templateUrl: './held-inventar.component.html',
  styleUrls: ['./held-inventar.component.css']
})
export class HeldInventarComponent extends HeldenComponent {

  public inventar: any[] = [];

  constructor(heldenService: HeldenService, routingService: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, routingService, authenticationService);
  }
  init() {
    this.heldenService.getInventar(this.heldenService.versionInfo.id)
      .subscribe(data => {
        this.inventar = data;
      });

  }

  deleteItem(index) {
    this.heldenService.removeItem(this.heldenService.versionInfo.id, index)
      .subscribe(data => this.inventar = data);
  }

}
