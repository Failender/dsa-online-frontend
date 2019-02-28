import {Component, OnDestroy, OnInit} from "@angular/core";
import {DsaDatum, KalendarTag, KalenderDaten, MONATE_DROPDOWN} from "./data";
import {KalenderService} from "./kalender.service";
import {combineLatest, Subject, Subscription} from "rxjs/index";
import {GruppenService} from "../shared/gruppen.service";
import {SelectItem} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {RoutingService} from "../shared/routing.service";

@Component({
  selector: 'app-dsa-kalender',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: []
})
export class CalendarComponent implements OnInit, OnDestroy {


  public heute: DsaDatum = new DsaDatum(1015, 3, 4);

  public createEventDatum = new DsaDatum(1015, 3, 4);
  public createEventName: string = 'asd';

  public monat: KalenderDaten;

  public heuteChanged = new Subject<DsaDatum>();
  private sub: Subscription;

  public meister;
  private gruppe;

  constructor(private kalenderService: KalenderService, private gruppenService: GruppenService, private route: ActivatedRoute,
              private router: RoutingService) { }

  ngOnInit() {
    this.sub = combineLatest(this.gruppenService.getCurrentGroup(), this.heuteChanged.asObservable())
      .subscribe(([gruppe, heute]) => {
        this.gruppe = gruppe.id;
        this.meister = gruppe.meister;
        if(gruppe.datum) {
          this.heute = this.kalenderService.toDsaDatum(gruppe.datum);
        }

        this.kalenderService.buildMonth(heute, gruppe.id)
          .subscribe(data => this.monat = data);
      });
    this.route.queryParams.subscribe(params => {
      if (params.date) {
        this.heute = this.kalenderService.toDsaDatum(params.date);
      }
      this.buildMonth();
    });

  }

  naechsterMonat() {
    this.heute.naechsterMonat()
    this.buildMonth();

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

  get monate(): SelectItem[] {
    return MONATE_DROPDOWN;
  }

  onEventClick($event, event) {
    $event.stopPropagation();
    if (event.type === 'ABENTEUER') {
      this.router.navigateByUrl(`/abenteuer/${event.id}`);
    }
    return false;
  }

  createEvent() {
    this.kalenderService.createEvent(this.createEventName, this.createEventDatum, this.gruppe)
      .subscribe(data => {
        this.heuteChanged.next(this.heute);
      })
  }
}
