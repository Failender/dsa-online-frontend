import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {HeldenInfo, HeldenService} from '../../meine-helden/helden.service';
import {MenuItem, SelectItem} from "primeng/api";
import {GruppenService} from '../gruppen.service';
import {MessageService} from '../service/message/message.service';
import {RoutingService} from "../routing.service";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../service/authentication/authentication.service";


interface ConditionalMenuItem extends MenuItem{
  condition?: any;
}

@Component({
  selector: 'app-helden-info-tabelle',
  templateUrl: './helden-info-tabelle.component.html',
  styleUrls: ['./helden-info-tabelle.component.css']
})
export class HeldenInfoTabelleComponent implements OnInit, OnChanges {

  public selectGruppeHeld: HeldenInfo;
  public possibleOptions: ConditionalMenuItem[] = [
    {
      label: 'Held laden',
      command: () => this.heldLaden(this._context)
    },
    {
      label: 'Version hochladen',
      command: () => this.alteVersionHochladen(this._context),
      condition: () => this.edit
    },
    {
      label: 'Alle Versionen anzeigen',
      command: () => this.alteVersionLaden(this._context)
    },
    {
      label: 'Mit voriger Version vergleichen',
      command: () => this.vorigeVersionVergleich(this._context),
      condition: () => this._context.version !== 1
    },
    {
      label: 'Alle Versionen herunterladen',
      command: () => this.versionenHerunterladen(this._context)
    },
    {
      label: 'Gruppe setzen',
      command: () => this.setGruppe(this._context)
    }
  ];

  private _context: HeldenInfo;
  public heldenOptions: MenuItem[] = [


  ];

  @Input()
  public data: HeldenInfo[];
  public gruppen: SelectItem[];

  public alteVersionLadenHeld: HeldenInfo;
  public alteVersionHochladenHeld: HeldenInfo;

  @Input() public edit = true;

  @Output() public forceReload = new EventEmitter<void>();

  constructor(private router: RoutingService, private heldenService: HeldenService , private gruppenService: GruppenService, private messageService: MessageService,
              private routingService: RoutingService, private authenticationService: AuthenticationService) { }

  ngOnInit() {

  }

  set context(value) {
    this._context = value;
    this.heldenOptions = this.possibleOptions.filter(entry => {
      if (entry.condition) {
        return entry.condition();
      } else {
        return true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.gruppen && 'data' in changes && this.data && this.data.length !== 0) {
      this.gruppenService.getGruppen()
        .subscribe(data => this.gruppen = data);
    }
  }

  heldLaden(held: HeldenInfo) {
    this._heldLaden(held.id, held.version);
  }
  vorigeVersionVergleich(data) {
    const url = `/held/vergleichen/${data.id}/${data.version - 1}/${data.version}`;
    this.routingService.navigateByUrl(url);
  }


  private _heldLaden(id: number, version: number) {
    this.heldenService.loadHeld(id, version)
      .subscribe(() => {
        this.router.navigateByUrl('held/uebersicht');
      });
  }

  alteVersionLaden(held: HeldenInfo) {
    this.alteVersionLadenHeld = held;
  }

  versionenHerunterladen(data) {
    const id = data.id;
    const iframe = document.createElement("iframe");
    let url = environment.rest + 'helden/download/' + id + '/xml';

    const username = this.authenticationService.authentication.username;
    const password = this.authenticationService.authentication.password;
    url += `?username=${username}&password=${password}`

    iframe.setAttribute("src", url);
    iframe.setAttribute("style", "display: none");
    document.body.appendChild(iframe);
  }

  dialogClosed(version) {
    if (version) {
      this._heldLaden(this.alteVersionLadenHeld.id, version);
    }
    this.alteVersionLadenHeld = null;
  }

  hochladenDialogClosed() {
    this.alteVersionHochladenHeld = null;
  }

  updatePublic(data, event) {
    this.heldenService.updatePublic(data.id, event.checked)
      .subscribe(() => {
        if (event.checked) {
          this.messageService.info(`Held ${data.name} ist jetzt öffentlich`);
        } else {
          this.messageService.info(`Held ${data.name} ist jetzt privat`);
        }
      });
  }

  updateActive(data, event) {
    this.heldenService.updateActive(data.id, event.checked)
      .subscribe(() => {
        if (event.checked) {
          this.messageService.info(`Held ${data.name} ist jetzt aktiv`);
        } else {
          this.messageService.info(`Held ${data.name} ist jetzt inaktiv`);
        }
      });
  }

  setGruppe(data) {
    this.selectGruppeHeld = data;
  }

  alteVersionHochladen(data) {
    this.alteVersionHochladenHeld = data;
  }

  onForceReload() {
    this.forceReload.emit();
  }

  preventClick() {
    return false;
  }

  groupSelected(reload: boolean) {
    this.selectGruppeHeld = null;
    if (reload) {
      this.forceReload.emit();
    }
  }

}
