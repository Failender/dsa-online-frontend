import { Component, OnInit } from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {AuthenticationRequiredComponent} from '../../shared/authentication-required/authentication-required.component';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {MeineHeldenComponent} from '../../meine-helden/meine-helden.component';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-held-uebersicht',
  templateUrl: './held-uebersicht.component.html',
  styleUrls: ['./held-uebersicht.component.css']
})
export class HeldUebersichtComponent extends HeldenComponent{



  public pdfOptions;

  constructor(heldenService: HeldenService, private authenticationService: AuthenticationService, router: Router) {
    super(heldenService, router);

  }

  protected init(): void {
    const url = environment.rest + `helden/held/pdf/${this.versioninfo.id}/${this.versioninfo.version}`
    this.pdfOptions = {
      url,
      httpHeaders: {
        'X-USER': this.authenticationService.authentication.username,
        'X-PASSWORD' : this.authenticationService.authentication.password
      }
    };
  }

}
