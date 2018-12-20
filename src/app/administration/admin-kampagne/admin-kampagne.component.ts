import {Component} from '@angular/core';
import {GruppenService} from "../../shared/gruppen.service";
import {CampaignService} from "../../campaign/campaign.service";
import {MessageService} from "../../shared/service/message/message.service";
import {AuthenticationRequiredComponent} from "../../shared/authentication-required/authentication-required.component";
import {AuthenticationService, EDIT_KAMPAGNE} from "../../shared/service/authentication/authentication.service";
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-admin-kampagne',
  templateUrl: './admin-kampagne.component.html',
  styleUrls: ['./admin-kampagne.component.css']
})
export class AdminKampagneComponent  extends AuthenticationRequiredComponent  {

  public name = "";
  constructor(private gruppenService: GruppenService, private kampagneService: CampaignService, private messageService: MessageService,
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
