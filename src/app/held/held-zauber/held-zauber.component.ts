import { Component, OnInit } from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-held-zauber',
  templateUrl: './held-zauber.component.html',
  styleUrls: ['./held-zauber.component.css']
})
export class HeldZauberComponent extends HeldenComponent {

  constructor(heldenService: HeldenService, router: RoutingService) {
    super(heldenService, router);
  }

}
