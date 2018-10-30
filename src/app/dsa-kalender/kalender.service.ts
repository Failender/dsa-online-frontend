import { Injectable } from '@angular/core';
import {DsaDatum, KalendarTag, KalenderDaten, START_YEAR, YEAR_LENGTH} from "./data";
import {RestService} from "../service/rest/rest.service";
import {Observable, of} from "rxjs/index";
import {map} from "rxjs/internal/operators";

interface Event {
  name: string;
  date: number;
  id: number;
}

interface EventResponse {
  events: {[key: string]: Event[]};
}

@Injectable({
  providedIn: 'root'
})
export class KalenderService {

  constructor(private restService: RestService) {
  }

  public toDsaDatum(value: number): DsaDatum {
    const jahr = START_YEAR + Math.floor(value / YEAR_LENGTH);
    let tag = (value % YEAR_LENGTH);
    const monatValue = Math.floor(tag / 30);
    tag %= 30;
    return new DsaDatum(jahr, monatValue, tag);
  }

  public toNumber(value: string) {
    if (value.charAt(2) !== '.' || value.charAt(5) !== '.') {
      throw new Error('Invalid format');
    }
    const tag = parseInt(value.substr(0, 2), 10);
    // The user expects to enter 01.01.1000 and make it the first day of the year, but we start with 01.00.1000
    const monat = parseInt(value.substr(3, 2), 10) - 1;
    const jahr = parseInt(value.substr(6), 10) - 1000;

    return jahr * YEAR_LENGTH + monat * 30 + tag;
  }

  public buildMonth(datum: DsaDatum, gruppe: number): Observable<KalenderDaten> {
    return this.restService.get(`events/${gruppe}/${datum.jahr}/${datum.monatValue}`)
      .pipe(map((data) => this.mapEventResponse(data, datum, gruppe)));

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
        tage = this.buildDays(dayOffset, datum.tag, 42, 30, datum.monatValue);
      } else {
        wochen = [0, 7, 14 , 21, 28];
        tage = this.buildDays(dayOffset, datum.tag , 35, 30, datum.monatValue);
      }
    }
    const mappedData = new Map();
    Object.keys(data).forEach(key => {
      const events: Event[] = data[key];
      events.forEach(event => {
        const relativeDay = (event.date % YEAR_LENGTH) % 30 + dayOffset;
        tage[relativeDay].events.push({color: 'red', name: event.name});

      });
    });
    return {
      jetzt: datum,
      tage, wochen, legende: null
    }
  }


  public buildDays(offset: number, day: number, total: number = 35, monthlength: number = 30, monat: number = 1) {
    const days = [];
    const preMonthLength = monat === 0 ? 5 : 30;
    for (let i = offset - 1 ; i >= 0; i--) {
      const tag = preMonthLength - i
      const dis = preMonthLength === 30 ?  false : (tag <= 0);
      days.push({
        tag: tag,
        heute: false,
        inMonat: false,
        relativerMonat: -1,
        events: [],
        disabled: dis
      });
    }
    let disabled = false;
    for (let i = 0; i < total - offset ; i++) {
      let _day = i + 1;
      // Sonderfall Namenlose Tage (fk Namenlose Tage)
      if (monat === 11 && _day >= 36) {
        disabled = true;
      }
      if (_day > monthlength) {
        _day = _day % monthlength;
      }

      days.push({
        tag: _day,
        events: [],
        inMonat: i < monthlength,
        isWeekend: false,
        relativerMonat: i < monthlength ? 0 : 1,
        heute: _day === day && i < monthlength,
        disabled: disabled
      });
    }
    return days;
  }
}
