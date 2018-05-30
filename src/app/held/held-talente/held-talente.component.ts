import {Component, Input, OnInit} from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {HeldenService} from '../../meine-helden/helden.service';
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-held-talente',
  templateUrl: './held-talente.component.html',
  styleUrls: ['./held-talente.component.css']
})
export class HeldTalenteComponent extends HeldenComponent {



  constructor(heldenService: HeldenService, router: RoutingService) {
    super(heldenService, router);
  }


}
