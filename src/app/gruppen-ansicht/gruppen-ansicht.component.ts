import { Component, OnInit } from '@angular/core';
import {GruppeInlcludingHeld, GruppenService} from '../meine-helden/gruppen.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-gruppen-ansicht',
  templateUrl: './gruppen-ansicht.component.html',
  styleUrls: ['./gruppen-ansicht.component.css']
})
export class GruppenAnsichtComponent implements OnInit {

  public gruppen: GruppeInlcludingHeld[];

  constructor(private gruppenService: GruppenService) { }

  ngOnInit() {
    this.gruppenService.getGruppenIncludingHeld()
      .subscribe((data) => this.gruppen = data);
  }

  onTabOpen(gruppe: SelectItem) {
    console.debug(gruppe);
  }

}
