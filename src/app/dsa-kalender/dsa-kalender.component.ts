import {Component, OnDestroy, OnInit} from "@angular/core";
import {DsaDatum, KalendarTag, KalenderDaten} from "./data";
import {KalenderService} from "./kalender.service";
import {SubjectSubscription} from "rxjs/internal/SubjectSubscription";
import {combineLatest, Subject, Subscription} from "rxjs/index";
import {GruppenService} from "../shared/gruppen.service";

@Component({
  selector: 'app-dsa-kalender',
  templateUrl: './dsa-kalender.component.html',
  styleUrls: ['./dsa-kalender.component.css'],
  providers: [KalenderService]
})
export class DsaKalenderComponent implements OnInit, OnDestroy {


  public heute: DsaDatum = new DsaDatum(1019, 0, 4);

  private gruppe: number = 1;
  public monat: KalenderDaten;

  private heuteChanged = new Subject<DsaDatum>();
  private sub: Subscription;

  constructor(private kalenderService: KalenderService, private gruppenService: GruppenService) { }

  ngOnInit() {
    this.sub = combineLatest(this.gruppenService.getCurrentGroup(), this.heuteChanged.asObservable())
      .subscribe(([gruppe, heute]) => {
        this.kalenderService.buildMonth(heute, gruppe.id)
          .subscribe(data => this.monat = data);
      });
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

    this.buildMonth();
  }

  onJahrChange() {
    this.buildMonth();
  }

  private buildMonth() {
    this.heuteChanged.next(this.heute);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
