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


  public monat: string;
  constructor(public jahr: number, public monatValue: number, public tag: number) {
    this.calcMonat();
  }

  public addTage(tage: number): boolean {
    this.tag += tage;
    if(this.monatValue === 12) {
     if(this.tag > 4) {
       this.monatValue = 0;
       this.tag = this.tag - 5;
       this.jahr ++;
       this.monat = MONATE[0];
       return true;
     }
    } else {
      if(this.tag > 30) {
        this.monatValue ++;
        this.tag -= 30;
        this.calcMonat();
        return true;
      }
    }
    return false;
  }

  public removeTage(tage: number): boolean {
    this.tag -= tage;

    if(this.monatValue == 0) {
      if(this.tag <= 0) {
        this.monatValue = 12;
        this.jahr -= 1;
        this.tag +=5;
        this.calcMonat();
        return true;
      }
    } else {
      if(this.tag <= 0) {
        this.monatValue -= 1;
        this.tag +=30;
        this.calcMonat();
        return true;
      }
    }

    return false;
  }

  public naechsterMonat(): boolean {
    this.monatValue ++;
    if (this.monatValue === 13) {
      this.monatValue = 0;
      this.jahr ++;
      this.calcMonat();
      return true;
    } else if (this.monatValue === 12 && this.tag > 4) {
      this.tag = 4;
    }
    this.calcMonat();
    return false;
  }

  private calcMonat() {
    this.monat = MONATE[this.monatValue];
  }

  public letzterMonat(): boolean {
    this.monatValue --;
    if(this.monatValue === -1) {
      this.monatValue = 12;
      this.jahr --;
      if(this.tag > 4) {
        this.tag = 4;
      }
      this.calcMonat();
      return true;
    }
    this.calcMonat();
    return false;
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


