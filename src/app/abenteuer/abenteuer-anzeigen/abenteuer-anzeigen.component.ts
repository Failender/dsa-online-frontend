import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {KampagnenService} from "../../kampagne/kampagnen.service";
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
export class AbenteuerAnzeigenComponent{

  @Input()
  public abenteuer: AbenteuerDto;

  @Output()
  public reload = new EventEmitter();

  constructor(private abenteuerService: AbenteuerService, private messageService: MessageService, private router: RoutingService) {

  }


  removeHeld(bonus: any) {
    this.abenteuerService.deleteBonus(bonus.name, this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info('Boni für Held ' + bonus.name + ' entfernt');
        this.reload.emit();
      });
  }

  removeGruppe() {
    this.abenteuerService.deleteBonus("gruppe", this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info('Boni für Gruppe entfernt');
        this.reload.emit();
      });
  }

  deleteAp(name) {
    this.abenteuerService.deleteSingleAp(name, this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info(`AP-Bonus für ${name} entfernt`);
        this.reload.emit();
      });

  }

  deleteSe(heldname: string, name: string) {
    this.abenteuerService.deleteSingleSe(heldname, this.abenteuer.id, name)
      .subscribe(() => {
        this.messageService.info(`SE für ${name} entfernt`);
        this.reload.emit();
      });
  }

  viewInCalendar() {
    if (this.abenteuer) {
      this.router.navigateByUrl('/kalender?date=' + this.abenteuer.datumValue);
    }
  }

}
