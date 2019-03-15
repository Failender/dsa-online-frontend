import {Component} from '@angular/core';
import {GruppenService} from "../../shared/gruppen.service";
import {CampaignService} from "../../shared/abenteuer/campaign.service";
import {MessageService} from "dsa-components";
import {AuthenticationRequiredComponent} from "../../shared/authentication-required/authentication-required.component";
import {AuthenticationService, EDIT_KAMPAGNE} from "../../shared/service/authentication/authentication.service";
import {RoutingService} from "dsa-components";

@Component({
  selector: 'app-admin-kampagne',
  templateUrl: './campaign-admin.component.html',
  styleUrls: ['./campaign-admin.component.css']
})
export class CampaignAdminComponent  extends AuthenticationRequiredComponent  {

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
