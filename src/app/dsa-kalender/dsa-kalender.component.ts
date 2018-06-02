import { Component, OnInit } from '@angular/core';
import {buildMonth, DsaDatum, KalenderDaten, toDsaDatum} from './data';

@Component({
  selector: 'app-dsa-kalender',
  templateUrl: './dsa-kalender.component.html',
  styleUrls: ['./dsa-kalender.component.css']
})
export class DsaKalenderComponent implements OnInit {


  public heute: DsaDatum = new DsaDatum(1015, 3, 30);

  public monat: KalenderDaten = buildMonth(this.heute);

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

  naechsterMonat() {
    this.heute.naechsterMonat()
    this.monat = buildMonth(this.heute);

  }

  naechsterTag() {
    this.heute.addTage(1)
    this.monat = buildMonth(this.heute);

  }

  letzterTag() {
    this.heute.removeTage(1)
    this.monat = buildMonth(this.heute);
  }

  letzterMonat() {
    this.heute.letzterMonat();
    this.monat = buildMonth(this.heute);
  }

}
