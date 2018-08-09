import { Component, OnInit } from '@angular/core';
import {GruppeIncludingHeld, GruppenService} from '../meine-helden/gruppen.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-gruppen-ansicht',
  templateUrl: './gruppen-ansicht.component.html',
  styleUrls: ['./gruppen-ansicht.component.css']
})
export class GruppenAnsichtComponent implements OnInit {

  public gruppen: GruppeIncludingHeld[];

  constructor(private gruppenService: GruppenService) { }

  ngOnInit() {
    // this.gruppenService.getGruppenIncludingHeld()
    //   .subscribe((data) => this.gruppen = data);
  }




}
