import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {RoutingService} from "../routing.service";
import {isNullOrUndefined} from "util";

export abstract class AuthenticationRequiredComponent implements OnInit {

  constructor(protected authenticationService: AuthenticationService, private router: RoutingService) {
  }

  ngOnInit() {
    if  (this.authenticationService.authenticated) {
      if (this.neededRight()) {
        if (!this.authenticationService.rights.includes(this.neededRight())) {
          console.debug('User does not got the permission ' + this.neededRight() + ' routing')
          this.router.navigateByUrl('/home');
        }
      }
      this.init();
    } else {
      this.router.navigateByUrl('/home');
      console.debug('User is not logged in - routing')
    }
  }

  protected neededRight(): string {
    return undefined;
  }

  protected abstract init(): void;

}



