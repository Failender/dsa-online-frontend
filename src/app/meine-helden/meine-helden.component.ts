import { Component, OnInit } from '@angular/core';
import {HeldenInfo, HeldenService} from './helden.service';
import {AuthenticationRequiredComponent} from '../shared/authentication-required/authentication-required.component';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {SelectItem} from 'primeng/api';
import {GruppenService} from './gruppen.service';
import {MessageService} from '../service/message/message.service';
import {RoutingService} from "../shared/routing.service";

@Component({
  selector: 'app-meine-helden',
  templateUrl: './meine-helden.component.html',
  styleUrls: ['./meine-helden.component.css'],
})
export class MeineHeldenComponent extends AuthenticationRequiredComponent{


  public helden: HeldenInfo[];


  constructor(private meineHeldenService: HeldenService, authenticationService: AuthenticationService, router: RoutingService, private messageService: MessageService) {
    super(authenticationService, router);
  }


  protected init(): void {
    this.meineHeldenService.getMeineHelden()
      .subscribe(
        data => this.helden = data
      );

  }

  reloadHelden() {
    this.messageService.info('Lade Helden neu..')
    this.meineHeldenService.reloadHelden()
      .subscribe((data) => {
        this.messageService.info('Laden abgeschlossen');
          this.helden = data;
      });
  }
}
