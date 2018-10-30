import { Injectable } from '@angular/core';
import {RestService} from "../service/rest/rest.service";
import {Observable} from "rxjs/index";
import {GruppenService} from "../shared/gruppen.service";
import {KalenderService} from '../dsa-kalender/kalender.service';
import {DsaDatum} from '../dsa-kalender/data';
import {map} from 'rxjs/operators';


export interface AbenteuerDto {
  id: number;
  name: string;
  gruppeId: number;
  gruppe: string;
  kampagneId: number;
  kampagne: string;
  meister: boolean;
  datumValue: number;
  datum: DsaDatum;
  ap: number;
  bonus: any[];
  bonusAll: any;
}
@Injectable({
  providedIn: 'root'
})
export class AbenteuerService {

  constructor(private restService: RestService, private gruppenService: GruppenService, private kalenderService: KalenderService) { }

  public createAbenteuer(data): Observable<any> {
    const datum = this.kalenderService.toNumber(data.datum);
    return this.restService.post(`abenteuer/${data.gruppe}/${data.kampagne}/${data.name}/${data.ap}/${datum}`, data);
  }

  public getAbenteuerForGruppe(gruppeid: number): Observable<AbenteuerDto[]> {
    return this.restService.get('abenteuer/gruppe/' + gruppeid)
      .pipe(map(data => {
        console.debug(data)
        data.forEach(entry => this.mapAbenteuer(entry));
        return data;
      }));
  }

  public getAbenteuerForKampagne(kampagneid: number): Observable<AbenteuerDto[]> {
    return this.restService.get('abenteuer/kampagne/' + kampagneid)
      .pipe(map(data => {
        data.forEach(entry => this.mapAbenteuer(entry));
        return data;
      }));
  }

  public deleteAbenteuer(id): Observable<void> {
    return this.restService.delete('abenteuer/' + id);
  }

  public getAbenteuer(id): Observable<AbenteuerDto> {
    return this.restService.get('abenteuer/' + id)
      .pipe(map(data => this.mapAbenteuer(data)));
  }

  public canEdit(abenteuer: AbenteuerDto): boolean {
    const id = abenteuer.gruppeId;
    return this.gruppenService.hasEditRight(id);
  }

  private mapAbenteuer(abenteuer: AbenteuerDto): AbenteuerDto {
    if (!abenteuer.datumValue) {
      return abenteuer;
    }
    abenteuer.datum = this.kalenderService.toDsaDatum(abenteuer.datumValue);
    return abenteuer;
  }

  public createSeBonus(held: number, abenteuer: number, se: string) {
    return this.restService.post(`abenteuer/se/${abenteuer}/${held}/${se}`, null);
  }

  public createApBonus(held: number, abenteuer: number, ap: number) {
    return this.restService.post(`abenteuer/ap/${abenteuer}/${held}/${ap}`, null);
  }

  public deleteBonus(name: string, abenteuerid: number) {
    return this.restService.delete(`abenteuer/${abenteuerid}/bonus/` + name);
  }

  public deleteSingleAp(name: string, abenteuerid: number) {
    return this.restService.delete(`abenteuer/${abenteuerid}/bonus/ap/` + name);
  }

  public deleteSingleSe(heldname: string, abenteuerid: number, name: string) {
    return this.restService.delete(`abenteuer/${abenteuerid}/bonus/se/${heldname}/${name}`);
  }


}
