import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {AuthenticationRequiredComponent} from "../../shared/authentication-required/authentication-required.component";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {RoutingService} from "../../shared/routing.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/api";
import {GruppenService} from "../../meine-helden/gruppen.service";

@Component({
  selector: 'app-abenteuer-erstellen',
  templateUrl: './abenteuer-erstellen.component.html',
  styleUrls: ['./abenteuer-erstellen.component.css']
})
export class AbenteuerErstellenComponent extends AuthenticationRequiredComponent  {

  @ViewChild('userinput')public userinput: ElementRef;

  public gruppen: SelectItem[];
  public helden: SelectItem[];

  public bonusTypen = [
    {label: 'SE', value: 'se'},
    {label: 'SE', value: 'se'}
  ]

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    ap: new FormControl('', Validators.required),
    gruppe: new FormControl('', Validators.required)
  });

  protected init(): void {
    this.userinput.nativeElement.focus();
    this.gruppenService.getGruppen()
      .subscribe(data => this.gruppen = data);
  }

  constructor(authenticationService: AuthenticationService, router: RoutingService, private gruppenService: GruppenService) {
    super(authenticationService, router);
  }

  neededRight() {
    return 'MEISTER';
  }

  onSubmit() {
    if (this.form.valid) {
      console.debug(this.form.value)
    }
  }

  onGruppeChange(event) {
    this.gruppenService.getHeldenForGruppe(event.value)
      .subscribe(data => this.helden = data.map(value => ({value: value.id, label: value.name})));
  }


}
