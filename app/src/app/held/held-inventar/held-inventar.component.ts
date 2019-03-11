import {Component} from '@angular/core';
import {HeldenComponent} from "../helden-component/helden-component.component";
import {HeldenService} from "dsa-components";
import {RoutingService} from "dsa-components";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";
import {MessageService} from "dsa-components";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-held-inventar',
  templateUrl: './held-inventar.component.html',
  styleUrls: ['./held-inventar.component.css']
})
export class HeldInventarComponent extends HeldenComponent {

  public name: string;
  public amount: string;
  public inventar: any[] = [];
  public lagerorte = [];
  public lagerorteDropDown = [];

  public addGegenstandForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "amount": new FormControl("", Validators.required)
  });

  public addLagerortForm = new FormGroup({
    "name": new FormControl('', Validators.required)
  })

  public loadingInventar = true;
  public loadingLagerorte = true;

  constructor(heldenService: HeldenService, routingService: RoutingService, authenticationService: AuthenticationService, private messageService: MessageService) {
    super(heldenService, routingService, authenticationService);
  }
  init() {
    this.heldenService.getInventar(this.heldenService.versionInfo.id)
      .subscribe(data => {
        this.loadingInventar = false;
        this.inventar = data;
      });

    this.heldenService.getLagerorte(this.heldenService.versionInfo.id)
      .subscribe(data => {
        this.setLagerorte(data);
      });

  }

  deleteItem(index) {
    this.heldenService.removeItem(this.heldenService.versionInfo.id, index)
      .subscribe(data => this.inventar = data);
  }

  save() {
    if (!this.addGegenstandForm.valid) {
      this.messageService.info('Bitte alle Felder ausfüllen');
      return;
    }

    const name = this.addGegenstandForm.value.name;
    const amount = parseInt(this.addGegenstandForm.value.amount, 10);
    this.heldenService.addItem(this.heldenService.versionInfo.id, name, amount )
      .subscribe((data) => {
        this.inventar = data;
      });
  }

  saveLagerort() {
    if (!this.addLagerortForm.valid) {
      this.messageService.info('Bitte alle Felder ausfüllen');
      return;
    }
    this.loadingLagerorte = true;
    this.heldenService.addLagerort(this.heldenService.versionInfo.id, this.addLagerortForm.value.name)
      .subscribe(data => this.setLagerorte(data));
  }

  private setLagerorte(data) {
    this.loadingLagerorte = false;
    this.lagerorteDropDown = data.map(e => {  return  {label: e.name, value: e};})
    this.lagerorte = data;
  }

  get loading() {
    return this.loadingInventar || this.loadingLagerorte;
  }

  onLagerortSelect(event, rowData) {
    this.heldenService.setLagerort(this.heldenService.versionInfo.id, rowData.lagerort, event.value.name, rowData.gegenstand, rowData.anzahl)
      .subscribe(() => {
        this.messageService.info('Lagerort des Gegenstandes wurde gespeichert');
      });
  }

  saveNotiz(row) {
    this.heldenService.updateLagerortNotiz(row.id, row.notizen)
      .subscribe(() => this.messageService.info('Notiz gespeichert'));
  }

  onAnzahlEdit(event) {
    this.messageService.info('Editieren ist noch nicht implementiert')

  }

}
