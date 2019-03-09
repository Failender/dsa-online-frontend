import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbenteuerDto, AbenteuerService} from "../abenteuer.service";
import {RoutingService} from "../../shared/routing.service";
import {MessageService} from "dsa-components";

@Component({
  selector: 'app-abenteuer-anzeigen',
  templateUrl: './abenteuer-anzeigen.component.html',
  styleUrls: ['./abenteuer-anzeigen.component.css']
})
export class AbenteuerAnzeigenComponent {

  @Input()
  public abenteuer: AbenteuerDto;

  @Output()
  public reload = new EventEmitter();

  constructor(private abenteuerService: AbenteuerService, private messageService: MessageService, private router: RoutingService) {

  }


  removeHeld(bonus: any) {
    this.abenteuerService.deleteBonus(bonus.heldid, this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info('Boni für Held ' + bonus.name + ' entfernt');
        this.reload.emit();
      });
  }

  removeGruppe() {
    this.abenteuerService.deleteBonus(-1, this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info('Boni für Gruppe entfernt');
        this.reload.emit();
      });
  }

  deleteAp(name, heldid) {
    this.abenteuerService.deleteSingleAp(heldid, this.abenteuer.id)
      .subscribe(() => {
        this.messageService.info(`AP-Bonus für ${name} entfernt`);
        this.reload.emit();
      });

  }

  deleteSe(heldname: string, name: string, heldid: number) {
    this.abenteuerService.deleteSingleSe(heldid, this.abenteuer.id, name)
      .subscribe(() => {
        this.messageService.info(`SE für ${name} entfernt`);
        this.reload.emit();
      });
  }

  deleteLm(heldname: string, name: string, heldid: number) {
    this.abenteuerService.deleteSingleLm(heldid, this.abenteuer.id, name)
      .subscribe(() => {
        this.messageService.info(`LM für ${name} entfernt`);
        this.reload.emit();
      });
  }

  deleteNote(id) {
    this.abenteuerService.deleteNote(this.abenteuer.id, id)
      .subscribe(() => {
        this.messageService.info(`Notiz entfernt`);
        this.reload.emit();
      });
  }

}
