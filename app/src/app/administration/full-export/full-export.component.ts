import {Component} from '@angular/core';
import {AuthenticationRequiredComponent} from '../../shared/authentication-required/authentication-required.component';
import {RoutingService} from '../../shared/routing.service';
import {AuthenticationService} from '../../shared/service/authentication/authentication.service';
import {Title} from '@angular/platform-browser';
import {AdministrationService} from '../administration.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-full-export',
  templateUrl: './full-export.component.html',
  styleUrls: ['./full-export.component.css']
})
export class FullExportComponent extends AuthenticationRequiredComponent {


  public statistics;

  constructor(authenticationService: AuthenticationService, router: RoutingService, titleService: Title, private adminService: AdministrationService) {
    super(authenticationService, router);
    titleService.setTitle('Export');
  }

  protected init(): void {
    this.adminService.getStatistics()
      .subscribe(data => this.statistics = data);
  }

  public fullExport() {

    // 'X-USER': this.authenticationService.authentication.username,
    //   'X-PASSWORD' : this.authenticationService.authentication.password
    const a = document.createElement('a');
    a.href = environment.rest + `administration/export/full?password=${this.authenticationService.authentication.password}&username=${this.authenticationService.authentication.username}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }



}
