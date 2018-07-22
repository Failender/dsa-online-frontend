import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {RoutingService} from '../shared/routing.service';
import {MessageService} from '../service/message/message.service';
import {HeldenInfo, HeldenService} from '../meine-helden/helden.service';
import {GruppeIncludingHeld, GruppenService} from '../meine-helden/gruppen.service';

@Component({
  selector: 'app-oeffentliche-helden',
  templateUrl: './oeffentliche-helden.component.html',
  styleUrls: ['./oeffentliche-helden.component.css']
})
export class OeffentlicheHeldenComponent implements OnInit {


  public gruppen: GruppeIncludingHeld[];

  private publicOnly = true;
  private showInactive = false;

  constructor(private gruppenService: GruppenService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadGruppen();
  }

  loadGruppen() {
      this.gruppenService.getGruppenIncludingHeld(this.publicOnly, this.showInactive)
        .subscribe((data) => this.gruppen = data);
  }

  onPublicChange(event) {
    this.publicOnly = event.checked;
    this.loadGruppen();
  }

  onActiveChange(event) {
    this.showInactive = !event.checked;
    this.loadGruppen();
  }

  get canViewAll(): boolean {
    return this.authenticationService.rights.includes('VIEW_ALL');
  }

  get editHelden() {
    return this.authenticationService.rights.includes('EDIT_ALL');
  }


}
