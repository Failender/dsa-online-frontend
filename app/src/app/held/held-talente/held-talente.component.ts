import {Component} from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {HeldenService} from 'dsa-components';
import {RoutingService} from "dsa-components";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";

@Component({
  selector: 'app-held-talente',
  templateUrl: './held-talente.component.html',
  styleUrls: ['./held-talente.component.css']
})
export class HeldTalenteComponent extends HeldenComponent {

  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, router, authenticationService);
  }

}
