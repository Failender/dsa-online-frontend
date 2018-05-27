import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HeldenService} from "../meine-helden/helden.service";

@Injectable()
export class RoutingService {

  constructor(private heldenService: HeldenService, private router: Router) { }

  public navigateByUrl(url: string) {
    if (this.heldenService.held) {
      url += `?held= ${this.heldenService.held.id}&version=${this.heldenService.held.version}`;

    }
    this.router.navigateByUrl(url);

  }

}
