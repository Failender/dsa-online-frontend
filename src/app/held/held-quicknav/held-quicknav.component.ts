import {Component} from '@angular/core';
import {RoutingService} from "../../shared/routing.service";
import {ActivatedRoute} from "@angular/router";
import {HeldenComponent} from "../helden-component/helden-component.component";
import {HeldenService} from "../../meine-helden/helden.service";
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
        if(data.length === 2) {
          this.subroute = data[1].path;
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

  geld() {
    this.routingService.navigateByUrl('held/geld');
  }



}
