import { Component, OnInit } from '@angular/core';
import {DsaDatum, KalenderDaten} from './data';
import {KalenderService} from "./kalender.service";

@Component({
  selector: 'app-dsa-kalender',
  templateUrl: './dsa-kalender.component.html',
  styleUrls: ['./dsa-kalender.component.css'],
  providers: [KalenderService]
})
export class DsaKalenderComponent implements OnInit {


  public heute: DsaDatum = new DsaDatum(1015, 3, 30);

  private gruppe: number = 1;
  public monat: KalenderDaten;

  constructor(private kalenderService: KalenderService) { }

  ngOnInit() {
    this.kalenderService.buildMonth(this.heute, this.gruppe)
      .subscribe(data => this.monat = data);
  }

  naechsterMonat() {
    this.heute.naechsterMonat()
    this.kalenderService.buildMonth(this.heute, this.gruppe)
      .subscribe(data => this.monat = data);

  }

  naechsterTag() {
    this.heute.addTage(1)
    this.kalenderService.buildMonth(this.heute, this.gruppe)
      .subscribe(data => this.monat = data);

  }

  letzterTag() {
    this.heute.removeTage(1)
    this.kalenderService.buildMonth(this.heute, this.gruppe)
      .subscribe(data => this.monat = data);
  }

  letzterMonat() {
    this.heute.letzterMonat();
    this.kalenderService.buildMonth(this.heute, this.gruppe)
      .subscribe(data => this.monat = data);
  }
}
