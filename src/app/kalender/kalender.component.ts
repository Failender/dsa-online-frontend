import { Component, OnInit } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarUtils
} from 'angular-calendar';
import {DsaDatum, monate, wochentage} from './data/DsaDatum';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};



export const useOverwrites = true;

@Component({
  selector: 'app-kalender',
  templateUrl: './kalender.component.html',
  styleUrls: ['./kalender.component.css']
})


export class KalenderComponent implements OnInit {


  public daySelect = Array.apply(null, {length: 30}).map(Function.call, Number)
    .map( val => ({label: val + 1, value: val}));

  public monthSelect = Array.apply(null, {length: 13}).map(Function.call, Number)
    .map( val => ({label: monate[val].name, value: val}));

  public yearSelect = Array.apply(null, {length: 30}).map(Function.call, Number)
    .map( val => ({label: val + 1000 , value: val + 1000}));



  private datum: DsaDatum = new DsaDatum(1000, 360);

  get viewDate() {
    return this.datum.realDatum;
  }

  get monat() {
    return this.datum.monat;
  }

  get jahr() {
    return this.datum.jahr;
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
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  private tag = 0;
  private _monat = 0;

  handleEvent(action: string, event: CalendarEvent): void {
    console.debug(action, event);
  }

  onDayChange(data: any) {
    this.tag = data.value;
    this.updateDatum();
  }

  onMonthChange(data: any) {
    this._monat = data.value;
    this.updateDatum();
  }

  updateDatum() {
    if (this._monat === 12  && this.tag > 4) {
      this.tag = 4;
    }
    this.datum.setTagMonat(this.tag, this._monat);
  }

  onYearChange(data: any) {
    this.datum.jahr = data.value;
  }

  jetzt() {

  }



  constructor() { }

  ngOnInit() {
  }

}
