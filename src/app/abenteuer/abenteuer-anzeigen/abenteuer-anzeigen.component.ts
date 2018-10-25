import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {KampagnenService} from "../../kampagnen/kampagnen.service";
import {AbenteuerDto, AbenteuerService} from "../abenteuer.service";
import {flatMap} from "rxjs/operators";
import {RoutingService} from "../../shared/routing.service";
import {MessageService} from "../../service/message/message.service";
import {AuthenticationService} from "../../service/authentication/authentication.service";

@Component({
  selector: 'app-abenteuer-anzeigen',
  templateUrl: './abenteuer-anzeigen.component.html',
  styleUrls: ['./abenteuer-anzeigen.component.css']
})
export class AbenteuerAnzeigenComponent implements OnInit, OnDestroy {

  public abenteuer: AbenteuerDto;

  private sub;

  public addSeGruppeid: number = null;
  public addApGruppeid: number = null;

  constructor(private activatedRoute: ActivatedRoute, private abenteuerService: AbenteuerService,
              private router: RoutingService, private messageService: MessageService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => this.loadAbenteuer(data.id));
    this.sub = this.authenticationService.onLogin.subscribe(() => this.loadAbenteuer(this.abenteuer.id));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back() {
    this.router.navigateByUrl("abenteuer")
  }

  private loadAbenteuer(id) {
    this.abenteuerService.getAbenteuer(id)
      .subscribe(data => this.abenteuer = data);
  }

  backToKampagne() {
    this.router.navigateByUrl("kampagne/" + this.abenteuer.kampagneId);
  }

  backToCreate() {
    this.router.navigateByUrl("administration/abenteuer")
  }

  onAddSeDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id)
    }
    this.addSeGruppeid = null;
  }

  onAddApDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id)
    }
    this.addApGruppeid = null;
  }

  removeHeld(bonus: any) {
    console.debug(bonus)
    this.abenteuerService.deleteBonus(bonus.name, this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info('Boni für Held ' + bonus.name + ' entfernt');
        this.loadAbenteuer(this.abenteuer.id);
      });
  }

  removeGruppe() {
    this.abenteuerService.deleteBonus("gruppe", this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info('Boni für Gruppe entfernt');
        this.loadAbenteuer(this.abenteuer.id);
      });
  }

  deleteAp(name) {
    this.abenteuerService.deleteSingleAp(name, this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info(`AP-Bonus für ${name} entfernt`);
        this.loadAbenteuer(this.abenteuer.id);
      });

  }

  deleteSe(heldname: string, name: string) {
    this.abenteuerService.deleteSingleSe(heldname, this.abenteuer.id, name)
      .subscribe(() => {
        this.messageService.info(`SE für ${name} entfernt`);
        this.loadAbenteuer(this.abenteuer.id);
      });
  }

}
