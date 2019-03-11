import {Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from 'rxjs/index';
import {HeldenService} from './helden.service';

@Injectable()
export class RoutingService {

  public routing = new Subject<void>();

  constructor(private heldenService: HeldenService, private injector: Injector) {
  }

  public navigateByUrl(url: string) {
    console.debug('NAVIGATE', url)
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
