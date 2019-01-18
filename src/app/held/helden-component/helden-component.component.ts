import {OnInit} from '@angular/core';
import {HeldenService, VersionInfo} from '../../meine-helden/helden.service';
import {RoutingService} from "../../shared/routing.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";
import {first} from "rxjs/operators";


// Base class for all components that display informations about a held
export abstract class HeldenComponent implements OnInit {

  constructor(protected heldenService: HeldenService, protected routingService: RoutingService, protected authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.initialized
      .pipe(first())
      .subscribe(() => {
        if (!this.heldenService.held) {
          this.routingService.navigateByUrl('home');
        } else {
          this.init();
        }
      });
  }

  protected init(): void {}

  get held() {
    return this.heldenService.held;
  }

  get versioninfo(): VersionInfo {
    return this.heldenService.versionInfo;
  }

  get write() {
    if (this.heldenService.versionInfo) {
      return this.heldenService.versionInfo.editable;
    }
    return false;

  }

  get xmlWrite() {
    if (this.heldenService.versionInfo) {
      return this.heldenService.versionInfo.xmlEditable;
    }
    return false;
  }

  get allowAddFavorites() {
    return this.heldenService.versionInfo.ownHeld;
  }

  get favoriten() {
    return this.heldenService.favorisierteTalente;
  }

  public favoriteAdded(name: string) {
      this.heldenService.addFavorit(this.heldenService.versionInfo.id, name)
        .subscribe(() => this.heldenService.favorisierteTalente[name] = true);
  }

  public favoriteRemoved(name: string) {
    this.heldenService.deleteFavorit(this.heldenService.versionInfo.id, name)
      .subscribe(() => delete this.heldenService.favorisierteTalente[name]);
  }

}
