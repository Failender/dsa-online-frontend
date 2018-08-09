import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {ConfigService} from '../shared/config/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() iconClicked = new EventEmitter<void>();


  public versions: any;
  public showLogin = false;
  constructor(public auth: AuthenticationService, private config: ConfigService) { }

  ngOnInit() {
    this.config.getVersions().subscribe(data => this.versions = data);
  }

  onClick() {
    this.iconClicked.emit();
  }

  login() {
    this.showLogin = true;
  }

  logout() {
    this.auth.logout();
  }

}
