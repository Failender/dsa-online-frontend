import { Component, OnInit } from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {HeldenService} from '../../meine-helden/helden.service';
import {RoutingService} from '../../shared/routing.service';
import {AuthenticationService} from '../../shared/service/authentication/authentication.service';
import {HeldGeldService} from './held-geld.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-held-geld',
  templateUrl: './held-geld.component.html',
  styleUrls: ['./held-geld.component.css']
})
export class HeldGeldComponent extends HeldenComponent {


  public form = new FormGroup({
      name: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required),
      waehrung: new FormControl("", Validators.required)
    }
  );

  public waehrungen;

  public muenzen;
  public loading = true;

  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService, private heldGeldService: HeldGeldService) {
    super(heldenService, router, authenticationService);
  }

  protected init(): void {
    this.heldGeldService.getMuenzen(this.heldenService.versionInfo.id)
      .subscribe(data => {
        this.loading = false;
        this.muenzen = data;
      });

    this.heldGeldService.getWaehrungen()
      .subscribe(data => this.waehrungen = data);
  }

  add() {
    const value = this.form.value;
    value.add = true;
    this.performRequest(value);
  }

  substract() {
    const value = this.form.value;
    value.add = false;
    this.performRequest(value);
  }

  private performRequest(data) {
    this.loading = true;
    this.heldGeldService.addWaehrung(this.heldenService.versionInfo.id, data)
      .subscribe(res => {
        this.muenzen = res;
        this.loading = false;
      });
  }

}
