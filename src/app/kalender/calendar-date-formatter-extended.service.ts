import { Injectable } from '@angular/core';
import {CalendarDateFormatter} from 'angular-calendar';
import {DateFormatterParams} from 'angular-calendar/modules/common/calendar-date-formatter.interface';
import {useOverwrites} from './kalender.component';
import {wochentage} from './data/DsaDatum';

@Injectable({
  providedIn: 'root'
})
export class CalendarDateFormatterExtendedService extends CalendarDateFormatter {


  monthViewColumnHeader(data: DateFormatterParams) {
    if (!useOverwrites) {
      return super.monthViewColumnHeader(data);
    }
    return wochentage[data.date.getDay()];

  }

  monthViewDayNumber(data: DateFormatterParams) {
    return super.monthViewDayNumber(data);
  }

  monthViewTitle(data: DateFormatterParams) {
    return super.monthViewTitle(data);
  }

  weekViewColumnHeader(data: DateFormatterParams) {
    return super.weekViewColumnHeader(data);
  }

  weekViewColumnSubHeader(data: DateFormatterParams) {
    return super.weekViewColumnSubHeader(data);
  }

  weekViewTitle(data: DateFormatterParams) {
    return super.weekViewTitle(data);
  }

  dayViewHour(data: DateFormatterParams) {
    return super.dayViewHour(data);
  }

  dayViewTitle(data: DateFormatterParams) {
    return super.dayViewTitle(data);
  }


}
