import {SelectItem} from "primeng/api";

export interface KalenderDaten {
  jetzt: DsaDatum;
  wochen: number[];
  tage: KalendarTag[];
  legende: Legende;
}

export interface Legende {
  items: LegendeItem[];
}

export interface LegendeItem {
  name: string;
  farbe: string;
}

export class DsaDatum {


  private _monatValue;
  public monat: string;
  constructor(public jahr: number, monatValue: number, public tag: number) {
    this.calcMonat();
    this.monatValue = monatValue;
  }

  set monatValue(value: number) {
    this._monatValue = value;
    this.calcMonat();
  }

  get monatValue() {
    return this._monatValue;
  }

  public naechsterMonat(): boolean {
    this.monatValue ++;
    if (this.monatValue === 13) {
      this.jahr ++;
      this.monatValue = 0;
      return true;
    } else if (this.monatValue === 12 && this.tag > 4) {
      this.tag = 4;
    }
    return false;
  }

  private calcMonat() {
    this.monat = MONATE[this.monatValue];
  }

  public letzterMonat(): boolean {
    this.monatValue --;
    if (this.monatValue === -1) {
      this.monatValue = 12;
      this.jahr --;
      if (this.tag > 4) {
        this.tag = 4;
      }
      return true;
    }
    return false;
  }

  public toString() {
    return this.tag + ". " + this.monat +  " " + this.jahr;
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
  relativerMonat: number;
  disabled: boolean;

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

export const MONATE_DROPDOWN: SelectItem[] = MONATE.map((value, idx) => {
  return {
    label: value,
    value: idx
  };
});



