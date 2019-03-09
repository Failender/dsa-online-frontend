import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication/authentication.service';
import {ConfigService} from '../shared/service/config/config.service';
import {GruppenService} from "../shared/gruppen.service";
import {isMobile} from '../util/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() iconClicked = new EventEmitter<void>();

  public placeholder = '';
  public groups: any;
  public versions: any;
  public showLogin = false;
  constructor(public auth: AuthenticationService, private config: ConfigService, private gruppenService: GruppenService) {
  }

  ngOnInit() {
    this.gruppenService.getGroups().subscribe(data => {
      this.groups = data;
      const currentGroup = data.find(group => group.value.userGroup);
      if (currentGroup) {
        this.gruppenService.setCurrentGroup(currentGroup.value);
        this.placeholder = currentGroup.label;
      } else {
        this.gruppenService.setCurrentGroup(data[0].value);
      }

    })
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

  onGroupSelect(event) {
    this.gruppenService.setCurrentGroup(event.value);
  }

  get mobile() {
    return isMobile();
  }

}
