import { Component, OnInit } from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {RoutingService} from "../../shared/routing.service";


export abstract class HeldenComponent implements OnInit {

  constructor(private heldenService: HeldenService, private routingService: RoutingService) { }

  ngOnInit() {
    if (!this.heldenService.held) {
      this.routingService.navigateByUrl('home');
    } else {
      this.init();
    }
  }

  protected init(): void {}

  get held() {
    return this.heldenService.held;
  }

  get versioninfo() {
    return this.heldenService.versionInfo;
  }

}
