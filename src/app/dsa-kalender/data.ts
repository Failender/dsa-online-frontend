export interface KalenderDaten {
  jetzt: DsaDatum;
  wochen: number[];
  tage: KalendarTag[];
}

export class DsaDatum {


  public monat: string;
  constructor(public jahr: number, public monatValue: number, public tag: number) {
    this.calcMonat();
  }

  public addTage(tage: number) {
    this.tag += tage;
    if (this.tag > YEAR_LENGTH) {
      this.tag %= YEAR_LENGTH;
      this.jahr ++;
    } else if(this.tag < YEAR_LENGTH) {
      this.tag += YEAR_LENGTH;
      this.jahr --;
    }
    this.monatValue = this.tag % 30;
    this.calcMonat();
  }

  public naechsterMonat() {
    this.monatValue ++;
    if (this.monatValue === 13) {
      this.monatValue = 0;
      this.jahr ++;
    } else if (this.monatValue === 12 && this.tag > 4) {
      this.tag = 4;
    }
  }

  private calcMonat() {
    this.monat = MONATE[this.monatValue];
  }

  public letzterMonat() {

  }
}

export interface DsaWoche {
  tage: KalendarTag[];
}

export interface KalendarTag {
  tag: number;
  events: Event[];
  jetzt: boolean;
  inMonat: boolean;

}

export interface Event {
  name: string;
  color: string;

}
export const START_YEAR = 1000;
export const YEAR_LENGTH = 365;
export const WOCHENTAGE = [
  'Rohalstag',
  'Feuertag',
  'Wassertag',
  'Windstag',
  'Erdstag',
  'Marktag',
  'Praiostag'
];

export const MONATE = [
  'Praios', 'Rondra', 'Efferd', 'Travia', 'Boron', 'Hesinde', 'Firun', 'Tsa', 'Phex', 'Peraine', 'Ingerimm', 'Rahja', 'Namenlose Tage'
];

export function toDsaDatum(value: number): DsaDatum {
  const jahr = START_YEAR + Math.floor(value / YEAR_LENGTH);
  const tag = value % YEAR_LENGTH;
  const monatValue = Math.floor(tag / 30);
  return new DsaDatum(jahr, monatValue, tag);
}

export function buildMonth(datum: DsaDatum): KalenderDaten {
  const dayOffset = (datum.jahr - START_YEAR + datum.monatValue * 2) % 7;
  let tage: KalendarTag[];
  let wochen;
  // Namenlose Tage
  if (datum.monatValue === 12) {
    const firstDay = (1 + dayOffset) % 7;
    if (firstDay > 2) {
      wochen = [0, 7];
      tage = buildDays(dayOffset, datum.tag % 30, 14, 5);
    } else {
      wochen = [0];
      tage = buildDays(dayOffset, datum.tag % 30, 7, 5);
    }
  } else {
    if (dayOffset === 6) {
      wochen = [0, 7, 14 , 21, 28, 35];
      tage = buildDays(dayOffset, datum.tag % 30, 42);
    } else {
      wochen = [0, 7, 14 , 21, 28];
      tage = buildDays(dayOffset, datum.tag % 30, 35);
    }
  }
  return {
    jetzt: datum,
    tage, wochen
  };
}


export function buildDays(offset: number, day: number, total: number = 35, monthlength: number = 30) {
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
    days.push({
      tag: i + 1,
      events: [],
      inMonat: i < monthlength,
      isWeekend: false,
      heute: i === day
    });
  }
  return days;
}
