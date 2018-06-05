import { Injectable } from '@angular/core';
import {DsaDatum, KalendarTag, KalenderDaten, START_YEAR, YEAR_LENGTH} from "./data";
import {RestService} from "../service/rest/rest.service";
import {Observable, of} from "rxjs/index";
import {map} from "rxjs/internal/operators";

interface Event {
  name: string;
  startDate: number;
  endDate: number;
  id: number;
}

interface EventResponse {
  events: {[key: string]: Event[]};
}

@Injectable()
export class KalenderService {

  constructor(private restService: RestService) { }

  public toDsaDatum(value: number): DsaDatum {
    const jahr = START_YEAR + Math.floor(value / YEAR_LENGTH);
    const tag = value % YEAR_LENGTH;
    const monatValue = Math.floor(tag / 30);
    return new DsaDatum(jahr, monatValue, tag);
  }

  public buildMonth(datum: DsaDatum, gruppe: number): Observable<KalenderDaten> {
    this.restService.get(`events/${gruppe}/${datum.jahr}/${datum.monat}`)
      .pipe(map((data) => this.mapEventResponse(data, datum, gruppe)))


  }

  private mapEventResponse(data: EventResponse, datum: DsaDatum, gruppe: number): KalenderDaten {



    const dayOffset = (datum.jahr - START_YEAR + datum.monatValue * 2) % 7;
    let tage: KalendarTag[];
    let wochen;
    // Namenlose Tage
    if (datum.monatValue === 12) {
      const firstDay = (1 + dayOffset) % 7;
      if (firstDay > 2) {
        wochen = [0, 7];
        tage = this.buildDays(dayOffset, datum.tag, 14, 5);
      } else {
        wochen = [0];
        tage = this.buildDays(dayOffset, datum.tag, 7, 5);
      }
    } else {
      if (dayOffset === 6) {
        wochen = [0, 7, 14 , 21, 28, 35];
        tage = this.buildDays(dayOffset, datum.tag, 42);
      } else {
        wochen = [0, 7, 14 , 21, 28];
        tage = this.buildDays(dayOffset, datum.tag , 35);
      }
    }
    const mappedData = new Map();
    Object.keys(data.events).forEach(key => {
      const events: Event[] = data.events[key];
      events.forEach(event => {
        if (event.endDate ) {

        } else {

        }
      });
    });


    return of({
      jetzt: datum,
      tage, wochen
    });
  }


  public buildDays(offset: number, day: number, total: number = 35, monthlength: number = 30) {
    const days = [];
    for (let i = offset - 1 ; i >= 0; i--) {
      days.push({
        tag:  30 - i,
        heute: false,
        inMonat: false,
        events: []
      });
    }
    for (let i = 0; i < total - offset ; i++) {
      let _day = i + 1;
      if (_day > monthlength) {
        _day = _day % monthlength;
      }

      days.push({
        tag: _day,
        events: [],
        inMonat: i < monthlength,
        isWeekend: false,
        heute: _day === day && i < monthlength
      });
    }
    return days;
  }
}
