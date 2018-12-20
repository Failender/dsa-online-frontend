import {Component} from '@angular/core';
import {AuthenticationRequiredComponent} from "../../shared/authentication-required/authentication-required.component";
import {Title} from "@angular/platform-browser";
import {RoutingService} from "../../shared/routing.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";
import {AdministrationService} from "../administration.service";
import {GruppenService} from "../../shared/gruppen.service";
import {SelectItem} from "primeng/api";
import {MessageService} from "../../shared/service/message/message.service";
import {UserService} from "../nutzer-verwaltung/user.service";

@Component({
  selector: 'app-meister-verwaltung',
  templateUrl: './meister-verwaltung.component.html',
  styleUrls: ['./meister-verwaltung.component.css']
})
export class MeisterVerwaltungComponent extends AuthenticationRequiredComponent {

  public meister: any[];
  public meisterGruppen: SelectItem[];
  public user: any;

  private currentGroup;
  constructor(authenticationService: AuthenticationService, router: RoutingService, titleService: Title,
              private administrationService: AdministrationService, private gruppenService: GruppenService, private messageService: MessageService,
              private userService: UserService) {
    super(authenticationService, router);
    titleService.setTitle('Meister-Verwaltung');
  }

  protected init(): void {
    this.gruppenService.getAllGruppenWhereCurrentUserCanEditMeister()
      .subscribe(data => this.meisterGruppen = data);
    this.userService.getAllUser()
      .subscribe(data => this.user = data);
  }

  onGruppeSelect(event) {
    this.currentGroup = event.value;
    this.loadMeister();
  }

  onUserSelect(event) {
    this.administrationService.addMeister(this.currentGroup, event.value)
      .subscribe(() => {
        this.messageService.info('Meister wurde hinzugefügt')
        this.loadMeister();
      });

  }

  private loadMeister() {
    this.administrationService.getMeisterForGruppe(this.currentGroup)
      .subscribe(data => this.meister = data);
  }

  removeMeister(id) {
    this.administrationService.removeMeister(this.currentGroup, id)
      .subscribe(() => {
        const idx = this.meister.findIndex(user => user.id === id);
        if (idx !== -1) {
          this.meister.splice(idx, 1);
          this.messageService.info('Meister erfolgreich entfernt');
        }
      })
  }





}

