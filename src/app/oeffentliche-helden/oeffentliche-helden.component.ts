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

  constructor(private gruppenService: GruppenService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadGruppen(true);
  }

  loadGruppen(publicOnly: boolean) {
    if (publicOnly) {
      this.gruppenService.getGruppenIncludingHeldPublic()
        .subscribe((data) => this.gruppen = data);
    } else {
      this.gruppenService.getGruppenIncludingHeld()
        .subscribe((data) => this.gruppen = data);
    }
  }

  onChange(event) {
    this.loadGruppen(event.checked);
  }

  get canViewAll(): boolean {
    return this.authenticationService.rights.includes('VIEW_ALL');
  }


}
