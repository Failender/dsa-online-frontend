import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {AuthenticationRequiredComponent} from "../../shared/authentication-required/authentication-required.component";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {RoutingService} from "../../shared/routing.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/api";
import {GruppenService} from "../../shared/gruppen.service";
import {MessageService} from "../../service/message/message.service";
import {AbenteuerService} from "../abenteuer.service";

@Component({
  selector: 'app-abenteuer-erstellen',
  templateUrl: './abenteuer-erstellen.component.html',
  styleUrls: ['./abenteuer-erstellen.component.css']
})
export class AbenteuerErstellenComponent extends AuthenticationRequiredComponent  {

  @ViewChild('userinput')public userinput: ElementRef;

  public gruppen: SelectItem[];
  public helden: SelectItem[];

  public selectedHeld = null;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    bonusAll: this.bonusControl(),
    gruppe: new FormControl('', Validators.required),
    bonus: new FormGroup({})
  });

  protected init(): void {
    this.userinput.nativeElement.focus();
    this.gruppenService.getMeisterGruppen()
      .subscribe(data => this.gruppen = data);
  }

  constructor(authenticationService: AuthenticationService, router: RoutingService, private abenteuerService: AbenteuerService,
              private gruppenService: GruppenService, private messageService: MessageService) {
    super(authenticationService, router);
  }

  neededRight() {
    return 'MEISTER';
  }

  onSubmit() {
    if (this.form.valid) {
      this.abenteuerService.createAbenteuer(this.form.value)
        .subscribe(() => {
          this.messageService.info('Abenteuer erstellt');
        });
    } else {
      this.messageService.error('Formular nicht korrekt ausgefüllt');
    }
    return false;
  }

  onGruppeChange(event) {
    this.gruppenService.getHeldenForGruppe(event.value)
      .subscribe(data => {
        this.helden = data.map(value => ({value: {id: value.id, name: value.name}, label: value.name}));
        if (this.helden.length === 0) {
          this.selectedHeld = null;
        } else {
          this.selectedHeld = this.helden[0].value;
        }
      });
  }

  onHeldChange(event) {
    this.selectedHeld = event.value;
  }

  addBonusforHeld() {
    const ctrl = <FormGroup>this.form.controls['bonus'];
    const group = this.bonusControl();
    ctrl.addControl(this.selectedHeld.id, group);
    return false;
  }

  addSeForHeld(event, held: string) {
    const ctrl = <FormControl>this.form.get(`bonus.${held}.ses`);
    ctrl.value.push(event.target.value);
  }

  addSeForAll(event) {
    const ctrl = <FormControl>this.form.get('bonusAll.ses');
    ctrl.value.push(event.target.value);
    return false;
  }

  getSesForAll() {
    const ctrl = <FormControl>this.form.get('bonusAll.ses');
    return ctrl.value;
  }

  getSesForHeld(held: string) {
    const ctrl = <FormControl>this.form.get(`bonus.${held}.ses`);
    return ctrl.value;
  }

  get bonusHelden() {
    return Object.keys(this.form.controls['bonus']['controls']);
  }

  heldname(id) {
    return this.helden.find(value => value.value.id == id).label;
  }

  getBonus(name) {
    return this.form.controls['bonus']['controls'][name];
  }

  removeSeForHeld(held: string, index: number) {

    const ctrl = <FormControl>this.form.get(`bonus.${held}.ses`);
    ctrl.value.splice(index, 1);
  }

  removeSeForAll(index: number) {
    const ctrl = <FormControl>this.form.get('bonusAll.ses');
    ctrl.value.splice(index, 1);
  }

  getBonusAllControl() {
    return this.form.get('bonusAll')
  }

  private bonusControl() {
    return new FormGroup({
      ap: new FormControl(0),
      ses: new FormControl([])
    });
  }


}
