import {Component} from '@angular/core';
import {HeldenService} from 'dsa-components';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {RoutingService} from "dsa-components";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";

@Component({
  selector: 'app-held-zauber',
  templateUrl: './held-zauber.component.html',
  styleUrls: ['./held-zauber.component.css']
})
export class HeldZauberComponent extends HeldenComponent {



  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, router, authenticationService);
  }

}
