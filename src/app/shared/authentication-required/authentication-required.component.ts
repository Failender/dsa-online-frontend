import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {RoutingService} from "../routing.service";

export abstract class AuthenticationRequiredComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: RoutingService) {
  }

  ngOnInit() {
    if  (this.authenticationService.authenticated) {
      this.init();
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  protected abstract init(): void;

}



