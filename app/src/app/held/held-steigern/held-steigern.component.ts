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

  public name;
  public amount;

  public loadingAp = true;
  public ap;
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
    this.heldenService.getApUncached(this.heldenService.versionInfo.id)
      .subscribe(data => {
        this.ap = data;
        this.loadingAp = false;
      });

  }

  public lernmethodeChange(d, event) {
    d.loading = true;
    this.heldenService.changeLernmethode(this.heldenService.versionInfo.id, d.talent, event.value)
      .subscribe(data => {
        this.steigerungen = data;
      });
  }

  public steigern(data) {
    data.loading = true;
    this.loadingAp = true;
    this.heldenService.steigern(this.heldenService.versionInfo.id, data.talent, data.talentwert)
      .subscribe(answer => {
        this.loadingAp = false;
        this.steigerungen = answer;
        this.ap.frei -= data.kosten;
      });
  }

  public saveEreignis() {
    this.loadingAp = true;
    this.heldenService.addEreignis(this.heldenService.versionInfo.id, this.name, parseInt(this.amount, 10))
      .subscribe(data => {
        this.ap = data;
        this.loadingAp = false;
      });
  }

  get gesamtap() {
    if (this.ap) {
      return this.ap.gesamt;
    }


  }

  get freieap() {
    if (this.ap) {
      return this.ap.frei;
    }
  }


}
