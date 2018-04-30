import { Component, OnInit } from '@angular/core';
import {HeldenInfo, HeldenService} from './helden.service';
import {AuthenticationRequiredComponent} from '../shared/authentication-required/authentication-required.component';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meine-helden',
  templateUrl: './meine-helden.component.html',
  styleUrls: ['./meine-helden.component.css'],
})
export class MeineHeldenComponent extends AuthenticationRequiredComponent{

  public helden: HeldenInfo[];

  constructor(private meineHeldenService: HeldenService, authenticationService: AuthenticationService, router: Router) {
    super(authenticationService, router);
  }


  protected init(): void {
    this.meineHeldenService.getMeineHelden()
      .subscribe(
        data => this.helden = data
      );
  }
}
