export const wochentage = [
  'Rohalstag',
  'Feuertag',
  'Wassertag',
  'Windstag',
  'Erdstag',
  'Marktag',
  'Praiostag'
];

export const monate = [
  {
    name: 'Praios'
  },
  {
    name: 'Rondra'
  },
  {
    name: 'Efferd'
  },
  {
    name: 'Travia'
  },
  {
    name: 'Boron'
  },
  {
    name: 'Hesinde'
  },
  {
    name: 'Firun'
  },
  {
    name: 'Tsa'
  },
  {
    name: 'Phex'
  },
  {
    name: 'Peraine'
  },
  {
    name: 'Ingerimm'
  },
  {
    name: 'Rahja'
  },
  {
    name: 'Namenlose Tage'
  }
]

// Rechung ab 1000 BF
export const startJahr = 1000;
export const startRealJahr = 2018;
export const laengeJahr = 365;

export class DsaDatum {

  constructor(private _jahr: number, private _tag: number){
    this.calculateRealDatum();
  }

  private _realDatum: Date;

  private calculateRealDatum(){
    const realYear = startRealJahr + this.jahr - startJahr;
    this._realDatum = new Date(realYear, 0,  this._tag, 0, 0, 0, 0);
  }

  public addTage(tage: number) {
    this._tag += tage;
    if (this._tag >= laengeJahr) {
      this._jahr ++;
      this._tag = this._tag % laengeJahr;
    } else if (this._tag < 0) {
      this._tag += laengeJahr;
      this._jahr -= 1;
    }
    this.calculateRealDatum();
  }

  public get realDatum() {
    return this._realDatum;
  }

  public setTagMonat(tag: number, monat: number) {
    this._tag = tag + monat * 30;
    this.calculateRealDatum();
  }

  public get monat() {
    return monate[Math.floor(this._tag / 30)].name;
  }

  public get jahr() {
    return this._jahr;
  }

  public set jahr(value: number) {
    this._jahr = value;
    this.calculateRealDatum()
  }

  public get tag() {
    return this._tag;
  }
}
