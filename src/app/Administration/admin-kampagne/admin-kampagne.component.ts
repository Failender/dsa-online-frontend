import { Component, OnInit } from '@angular/core';
import {GruppenService} from "../../shared/gruppen.service";
import {KampagnenService} from "../../kampagne/kampagnen.service";
import {MessageService} from "../../service/message/message.service";
import {AuthenticationRequiredComponent} from "../../shared/authentication-required/authentication-required.component";
import {AuthenticationService, EDIT_KAMPAGNE} from "../../service/authentication/authentication.service";
import {Router} from "@angular/router";
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-admin-kampagne',
  templateUrl: './admin-kampagne.component.html',
  styleUrls: ['./admin-kampagne.component.css']
})
export class AdminKampagneComponent  extends AuthenticationRequiredComponent  {

  public name = "";
  constructor(private gruppenService: GruppenService, private kampagneService: KampagnenService, private messageService: MessageService,
              authenticationService: AuthenticationService, router: RoutingService) {
    super(authenticationService, router);
  }

  neededRight() {
    return EDIT_KAMPAGNE;
  }

  init() {
  }

  createKampagne() {
    if (this.name.length === 0) {
      this.messageService.error("Bitte einen Namen für die Kampagne angeben");
      return;
    }
    this.kampagneService.createKampagne(this.name, this.gruppenService.getCurrentGroupValue().id)
      .subscribe(() => {
        this.gruppenService.forceRefresh()
        this.messageService.info(`Kampagne ${this.name} erfolgreich erstellt`);
      });
  }

}
