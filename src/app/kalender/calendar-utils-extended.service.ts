import { Injectable } from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarUtils} from 'angular-calendar';
import {useOverwrites} from './kalender.component';
import {addDays, getDayOfYear, startOfDay, subDays} from 'date-fns';
import {laengeJahr, startRealJahr, wochentage} from './data/DsaDatum';
import {of} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class CalendarUtilsExtendedService extends CalendarUtils {

  getMonthView(args: any) {
    const startDate = args.viewDate;
    const dayOfYear = getDayOfYear(startDate);
    const month = Math.floor(dayOfYear / 30);

    const yearOffset = (startDate.getFullYear() - startRealJahr) % 7;

    const dayOffSet = (yearOffset + month * 2 ) % 7;
    if (!useOverwrites) {
      return super.getMonthView(args);
    }
    const val = super.getMonthView(args);

    if (dayOfYear >= 360) {
      this.buildNamenloseDays(val, dayOffSet, dayOfYear);
    } else {

      if(dayOffSet === 6) {
        val.rowOffsets = [0, 7, 14, 21, 28, 35];
        val.days = this.buildDays(dayOffSet, dayOfYear % 30, 42);
      } else {
        val.rowOffsets = [0, 7, 14, 21, 28];
        val.days = this.buildDays(dayOffSet, dayOfYear % 30);
      }
    }
    return val;
  }

  getWeekView(args: any) {
    return super.getWeekView(args);
  }

  getWeekViewHeader(args: any) {


    if (!useOverwrites) {
      return super.getWeekViewHeader(args);
    }
    const ret = [];
    for (let i = 0; i < wochentage.length; i++) {
      ret.push({
        date: new Date(2018, 0, i , 0, 0, 0, 0),
        isFuture: false,
        isPast: true,
        isToday: false,
        isWeekend: false,

      });
    }

    const val = super.getWeekViewHeader(args);
    return ret;
  }


  private buildDays(offset: number, day: number, total: number = 35, monthlength: number = 30) {
    const days = [];
    for (let i = offset - 1 ; i >= 0; i--) {
      days.push({
        badgeTotal: 0,
        date: new Date(2018, 0, 30 - i, 0, 0, 0, 0),
        events: [],
        inMonth: false,
        // isFuture: false,
        // isPast: false,
        isWeekend: false,
        cssClass: 'cal-cell cal-day-cell cal-today cal-in-month cal-has-events ng-star-inserted'
      });
    }
    for (let i = 0; i < total - offset ; i++) {
      days.push({
        badgeTotal: 0,
        date: new Date(2018, 0, i +1, 0, 0, 0, 0),
        events: [],
        inMonth: i < monthlength,
        // isFuture: true,
        // isPast: false,
        isWeekend: false,
        isToday: i === day
      });
    }
    return days;
  }

  private buildNamenloseDays(val: any, offset: number, day: number) {
    const firstDay = (1 + offset) % 7;
    if (firstDay > 2) {
      val.days = this.buildDays(offset, day % 30, 14, 5);
    } else {
      val.days = this.buildDays(offset, day % 30, 7, 5);
    }
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
       // this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  handleEvent(action: string, event: CalendarEvent): void {
    console.debug(action, event);
  }
}
