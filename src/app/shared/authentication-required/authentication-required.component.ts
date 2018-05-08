import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';

export abstract class AuthenticationRequiredComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
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



