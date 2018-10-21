import {Component, ElementRef, Input, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AuthenticationRequiredComponent} from "../../shared/authentication-required/authentication-required.component";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {RoutingService} from "../../shared/routing.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/api";
import {GruppenService} from "../../shared/gruppen.service";
import {MessageService} from "../../service/message/message.service";
import {AbenteuerService} from "../abenteuer.service";
import {KampagnenService} from "../../kampagnen/kampagnen.service";
import {map, tap} from "rxjs/internal/operators";

@Component({
  selector: 'app-abenteuer-erstellen',
  templateUrl: './abenteuer-erstellen.component.html',
  styleUrls: ['./abenteuer-erstellen.component.css']
})
export class AbenteuerErstellenComponent extends AuthenticationRequiredComponent implements OnDestroy {

  @ViewChild('userinput')public userinput: ElementRef;

  @Input() public kampagne;

  public kampagneName = undefined;
  public gruppenName = '';
  public isMeister = false;
  public kampagnen: SelectItem[];
  public selectedHeld = null;

  private sub;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    ap: new FormControl('', Validators.required),
    gruppe: new FormControl('', Validators.required),
    kampagne: new FormControl('', Validators.required),
  });

  protected init(): void {
    if (this.kampagne) {
      this.kampagneName = this.kampagne.name;
      const gruppe = this.gruppenService.getGruppe(this.kampagne.gruppeId)
      this.gruppenName = gruppe.name;
      this.isMeister = gruppe.meister;
      this.form.controls['gruppe'].patchValue(gruppe.id);
      this.form.controls['kampagne'].patchValue(this.kampagne.id);

    } else {
      this.sub = this.gruppenService.getCurrentGroup()
        .subscribe(group => {
          this.onGruppeChange(group);
        });
    }


    this.userinput.nativeElement.focus();
  }

  constructor(authenticationService: AuthenticationService, router: RoutingService, private abenteuerService: AbenteuerService,
              private gruppenService: GruppenService, private messageService: MessageService, private kampagnenService: KampagnenService) {
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
          this.gruppenService.forceRefresh();
        });
    } else {
      this.messageService.error('Formular nicht korrekt ausgefüllt');
    }
    return false;
  }

  onGruppeChange(group) {
    this.gruppenName = group.name;
    this.form.controls['gruppe'].patchValue(group.id);
    this.isMeister = group.meister;
    this.kampagnenService.getKampagnen(group.id)
      .pipe(map(data => {
        return data.map(kampagne => {return {"label": kampagne.name, value: kampagne.id}});
      }))
      .subscribe(data => this.kampagnen = data);
    // this.gruppenService.getHeldenForGruppe(event.value)
    //   .subscribe(data => {
    //     this.helden = data.map(value => ({value: {id: value.id, name: value.name}, label: value.name}));
    //     if (this.helden.length === 0) {
    //       this.selectedHeld = null;
    //     } else {
    //       this.selectedHeld = this.helden[0].value;
    //     }
    //   });
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

  }


}
