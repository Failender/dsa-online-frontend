import {Component, Input, OnInit} from '@angular/core';
import {HeldenInfo, HeldenService} from '../../meine-helden/helden.service';
import {Router} from '@angular/router';
import {SelectItem} from 'primeng/api';
import {GruppenService} from '../../meine-helden/gruppen.service';

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

  constructor(private router: Router, private heldenService: HeldenService , private gruppenService: GruppenService) { }

  ngOnInit() {
    this.gruppenService.getGruppen()
      .subscribe(data => this.gruppen = data);
  }

  heldLaden(held: HeldenInfo) {
    this._heldLaden(held.id, held.version);
  }

  onDropdownSelected(gruppeId, heldenId) {
    this.gruppenService.updateGruppe(heldenId, gruppeId)
      .subscribe(
        () => {

        }
      );
  }

  private _heldLaden(id: number, version: number) {
    const sub = this.heldenService.heldLoaded.subscribe(
      () => {
        sub.unsubscribe();
        this.router.navigateByUrl('held/ereignisse');
      }
    )
    this.heldenService.loadHeld(id, version);
  }

  alteVersionLaden(held: HeldenInfo) {
    this.alteVersionLadenHeld = held;
  }

  dialogClosed(version) {
    this.alteVersionLadenHeld = null;
    if (version) {
      this._heldLaden(this.alteVersionLadenHeld.id, version);

    }
  }

}
