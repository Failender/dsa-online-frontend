import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {RoutingService} from "../routing.service";
import {isNullOrUndefined} from "util";

export abstract class AuthenticationRequiredComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: RoutingService) {
  }

  ngOnInit() {
    if  (this.authenticationService.authenticated) {
      if (this.neededRight()) {
        if (!this.authenticationService.rights.includes(this.neededRight())) {
          this.router.navigateByUrl('/home');
        }
      }
      this.init();
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  protected neededRight(): string {
    return undefined;
  }

  protected abstract init(): void;

}



