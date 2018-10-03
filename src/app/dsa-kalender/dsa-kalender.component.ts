import { Component, OnInit } from '@angular/core';
import {DsaDatum, KalendarTag, KalenderDaten} from "./data";
import {KalenderService} from "./kalender.service";

@Component({
  selector: 'app-dsa-kalender',
  templateUrl: './dsa-kalender.component.html',
  styleUrls: ['./dsa-kalender.component.css'],
  providers: [KalenderService]
})
export class DsaKalenderComponent implements OnInit {


  public heute: DsaDatum = new DsaDatum(1019, 0, 4);

  private gruppe: number = 1;
  public monat: KalenderDaten;

  constructor(private kalenderService: KalenderService) { }

  ngOnInit() {
    this.buildMonth();
  }

  naechsterMonat() {
    this.heute.naechsterMonat()
    this.buildMonth();

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
    this.buildMonth();
  }

  onDayClick(tag: KalendarTag) {
    if(tag.disabled) {
      return;
    }
    if (tag.inMonat) {
      this.heute = new DsaDatum(this.heute.jahr, this.heute.monatValue, tag.tag);
    } else {

      if (tag.relativerMonat === 1 ) {
        this.heute.naechsterMonat();

      } else {
        this.heute.letzterMonat();
      }
      this.heute.tag = tag.tag;
    }

    this.kalenderService.buildMonth(this.heute, this.gruppe)
      .subscribe(data => this.monat = data);
  }

  onJahrChange() {
    this.buildMonth();
  }

  private buildMonth() {
    this.kalenderService.buildMonth(this.heute, this.gruppe)
      .subscribe(data => this.monat = data);
  }
}
