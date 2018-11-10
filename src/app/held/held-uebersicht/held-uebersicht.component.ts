import { Component, OnInit } from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {AuthenticationRequiredComponent} from '../../shared/authentication-required/authentication-required.component';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {MeineHeldenComponent} from '../../meine-helden/meine-helden.component';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {environment} from '../../../environments/environment';
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-held-uebersicht',
  templateUrl: './held-uebersicht.component.html',
  styleUrls: ['./held-uebersicht.component.css']
})
export class HeldUebersichtComponent extends HeldenComponent {



  public pdfOptions;

  public zauberButton = false;

  constructor(heldenService: HeldenService, private authenticationService: AuthenticationService, router: RoutingService) {
    super(heldenService, router);
  }

  protected init(): void {
    this.zauberButton = this.held.zauberliste.zauber.length !== 0;
    const url = environment.rest + `download/pdf/${this.versioninfo.id}/${this.versioninfo.version}`
    if(this.authenticationService.authenticated) {
      this.pdfOptions = {
        url,
        httpHeaders: {
          'username': this.authenticationService.authentication.username,
          'password' : this.authenticationService.authentication.password
        }
      };
    } else {
      this.pdfOptions = {
        url
      };
    }

  }

  ereignisse() {
    this.routingService.navigateByUrl('held/ereignisse')
  }

  zauber(){
    this.routingService.navigateByUrl('held/zauber')
  }

}
