import {Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {HeldenService} from "../meine-helden/helden.service";
import {Subject} from 'rxjs/index';

@Injectable()
export class RoutingService {

  public routing = new Subject<void>();

  constructor(private heldenService: HeldenService, private injector: Injector) {
  }

  public navigateByUrl(url: string) {
    if (!url) {
      return;
    }
    if (this.heldenService.held) {
      url += `?held=${this.heldenService.versionInfo.id}&version=${this.heldenService.versionInfo.version}`;

    }
    this.routing.next();
    this.injector.get(Router).navigateByUrl(url);

  }

}
