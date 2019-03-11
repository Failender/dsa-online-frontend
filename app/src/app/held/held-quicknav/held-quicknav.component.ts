import {Component} from '@angular/core';
import {RoutingService} from "dsa-components";
import {ActivatedRoute} from "@angular/router";
import {HeldenComponent} from "../helden-component/helden-component.component";
import {HeldenService} from "dsa-components";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";

@Component({
  selector: 'app-held-quicknav',
  templateUrl: './held-quicknav.component.html',
  styleUrls: ['./held-quicknav.component.css']
})
export class HeldQuicknavComponent extends HeldenComponent {

  public zauberButton;
  public subroute;

  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {
    super(heldenService, router, authenticationService);
  }

  init() {
    this.zauberButton = this.held.zauberliste.zauber.length !== 0;
    this.activatedRoute.url
      .subscribe(data => {
        if(data.length === 1) {
          this.subroute = data[0].path;
        }
      });
  }

  uebersicht() {
    this.routingService.navigateByUrl('held/uebersicht');
  }

  zauber(){
    this.routingService.navigateByUrl('held/zauber');
  }

  ereignisse() {
    this.routingService.navigateByUrl('held/ereignisse');
  }

  inventar() {
    this.routingService.navigateByUrl('held/inventar');
  }

  steigern() {
    this.routingService.navigateByUrl('held/steigern');
  }

  mobil() {
    this.routingService.navigateByUrl('held/mobil');
  }

  geld() {
    this.routingService.navigateByUrl('held/geld');
  }

  talente() {
    this.routingService.navigateByUrl('held/talente');
  }



}
