import {Component, Input, OnInit} from '@angular/core';
import {HeldenInfo, HeldenService} from '../../meine-helden/helden.service';
import {SelectItem} from 'primeng/api';
import {GruppenService} from '../../meine-helden/gruppen.service';
import {MessageService} from '../../service/message/message.service';
import {RoutingService} from "../routing.service";

@Component({
  selector: 'app-helden-info-tabelle',
  templateUrl: './helden-info-tabelle.component.html',
  styleUrls: ['./helden-info-tabelle.component.css']
})
export class HeldenInfoTabelleComponent implements OnInit {

  @Input()
  public data: HeldenInfo[];
  public gruppen: SelectItem[];

  public alteVersionLadenHeld: HeldenInfo;

  constructor(private router: RoutingService, private heldenService: HeldenService , private gruppenService: GruppenService, private messageService: MessageService) { }

  ngOnInit() {
    this.gruppenService.getGruppen()
      .subscribe(data => this.gruppen = data);
  }

  heldLaden(held: HeldenInfo) {
    this._heldLaden(held.id, held.version);
  }

  onDropdownSelected(gruppeId, heldenId) {
    this.messageService.info('Gruppe wird geändert..')
    this.gruppenService.updateGruppe(heldenId, gruppeId)
      .subscribe(
        () => {
          this.messageService.info('Gruppe erfolgreich geändert');
        }
      );
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

  dialogClosed(version) {

    if (version) {
      this._heldLaden(this.alteVersionLadenHeld.id, version);
    }
    this.alteVersionLadenHeld = null;
  }

}
