import {Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {HeldenService} from "../meine-helden/helden.service";

@Injectable()
export class RoutingService {

  constructor(private heldenService: HeldenService, private injector: Injector) {
  }

  public navigateByUrl(url: string) {
    if (this.heldenService.held) {
      url += `?held= ${this.heldenService.versionInfo.id}&version=${this.heldenService.versionInfo.version}`;

    }
    this.injector.get(Router).navigateByUrl(url);

  }

}
