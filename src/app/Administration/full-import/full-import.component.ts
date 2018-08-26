import { Component, OnInit } from '@angular/core';
import {AuthenticationRequiredComponent} from '../../shared/authentication-required/authentication-required.component';
import {RoutingService} from '../../shared/routing.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-full-import',
  templateUrl: './full-import.component.html',
  styleUrls: ['./full-import.component.css']
})
export class FullImportComponent extends AuthenticationRequiredComponent {


  constructor(authenticationService: AuthenticationService, router: RoutingService, titleService: Title) {
    super(authenticationService, router);
    titleService.setTitle('Import');
  }

  protected init(): void {
  }



}
