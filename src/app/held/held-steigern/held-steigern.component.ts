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
  public loading = true;
  public lernmethoden = [
    {
      label: 'Selbststudium',
      value: 'Selbststudium'
    },
    {
      label: 'Gegenseitiges Lehren',
      value: 'Gegenseitiges Lehren'
    },
    {
      label: 'Lehrmeister',
      value: 'Lehrmeister'

    },
    {
      label: 'Freie Steigerung',
      value: 'Freie Steigerung'

    }
    ];

  constructor(heldenService: HeldenService, routingService: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, routingService, authenticationService);
  }

  init() {
    this.heldenService.getSteigerungen(this.heldenService.versionInfo.id)
      .subscribe(data => {
        this.steigerungen = data;
        this.loading = false;
      });
  }

  public lernmethodeChange(talent, event) {
    this.loading = true;
    this.heldenService.changeLernmethode(this.heldenService.versionInfo.id, talent, event.value)
      .subscribe(data => {
        this.loading = false;
        this.steigerungen = data;
      });
  }

  public steigern(data) {
    this.loading = true;
    this.heldenService.steigern(this.heldenService.versionInfo.id, data.talent, data.talentwert)
      .subscribe(answer => {
        this.loading = false;
        this.steigerungen = answer;
      });
  }

  get gesamtap() {
    if (this.held) {
      return this.held.angaben.ap.gesamt;
    }


  }

  get freieap() {
    if (this.held) {
      return this.held.angaben.ap.frei;
    }
  }


}
