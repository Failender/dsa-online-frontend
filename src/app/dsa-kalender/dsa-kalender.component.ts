import { Component, OnInit } from '@angular/core';
import {buildMonth, DsaDatum, KalenderDaten, toDsaDatum} from './data';

@Component({
  selector: 'app-dsa-kalender',
  templateUrl: './dsa-kalender.component.html',
  styleUrls: ['./dsa-kalender.component.css']
})
export class DsaKalenderComponent implements OnInit {


  private heute: DsaDatum = new DsaDatum(1015, 3, 20);

  private monat: KalenderDaten = buildMonth(this.heute);

  constructor() { }

  ngOnInit() {

    this.monat.tage[4].events = [
      {
        color: 'red',
        name: 'THIS IS AN EVENT YES HELLO'
      },
      {
        color: '',
        name: 'Baguette'
      }
    ];
  }

}
