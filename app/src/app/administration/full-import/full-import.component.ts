import {Component} from '@angular/core';
import {AuthenticationRequiredComponent} from '../../shared/authentication-required/authentication-required.component';
import {RoutingService} from 'dsa-components';
import {AuthenticationService} from '../../shared/service/authentication/authentication.service';
import {Title} from '@angular/platform-browser';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-full-import',
  templateUrl: './full-import.component.html',
  styleUrls: ['./full-import.component.css']
})
export class FullImportComponent extends AuthenticationRequiredComponent {

  public uploadUrl = environment.rest + 'administration/import/full'

  constructor(authenticationService: AuthenticationService, router: RoutingService, titleService: Title) {
    super(authenticationService, router);
    titleService.setTitle('Import');
  }

  protected init(): void {
  }

  onBeforeSend(event) {
    event.xhr.setRequestHeader('X-PASSWORD', this.authenticationService.authentication.password)
    event.xhr.setRequestHeader('X-USER', this.authenticationService.authentication.username)

  }

  onUpload(event) {
  }



}
