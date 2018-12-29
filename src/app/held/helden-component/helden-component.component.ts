import {OnInit} from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {RoutingService} from "../../shared/routing.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";
import {first} from "rxjs/operators";


// Base class for all components that display informations about a held
export abstract class HeldenComponent implements OnInit {

  constructor(protected heldenService: HeldenService, protected routingService: RoutingService, protected authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.initialized
      .pipe(first())
      .subscribe(() => {
        if (!this.heldenService.held) {
          this.routingService.navigateByUrl('home');
        } else {
          this.init();
        }
      });

  }

  protected init(): void {}

  get held() {
    return this.heldenService.held;
  }

  get versioninfo() {
    return this.heldenService.versionInfo;
  }

  get write() {
    if(this.heldenService.versionInfo) {
      return this.heldenService.versionInfo.edit;
    }
    return false;

  }

}
