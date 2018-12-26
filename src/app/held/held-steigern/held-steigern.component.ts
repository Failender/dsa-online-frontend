import {Component} from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {RoutingService} from '../../shared/routing.service';
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";

@Component({
  selector: 'app-held-steigern',
  templateUrl: './held-steigern.component.html',
  styleUrls: ['./held-steigern.component.css']
})
export class HeldSteigernComponent extends HeldenComponent{

  public steigerungen;

  constructor(heldenService: HeldenService, routingService: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, routingService, authenticationService);
  }

  init() {
    this.heldenService.getSteigerungen(this.heldenService.versionInfo.id)
      .subscribe(data => {
        this.steigerungen = data;
      });
  }

}
