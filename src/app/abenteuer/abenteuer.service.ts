import { Injectable } from '@angular/core';
import {RestService} from "../service/rest/rest.service";
import {Observable} from "rxjs/index";
import {GruppenService} from "../shared/gruppen.service";


export interface AbenteuerDto {
  id: number;
  name: string;
  gruppeId: number;
  gruppe: string;
  kampagneId: number;
  kampagne: string;
  meister: boolean;
  ap: number;
  bonus: any[];
  bonusAll: any;
}
@Injectable({
  providedIn: 'root'
})
export class AbenteuerService {

  constructor(private restService: RestService, private gruppenService: GruppenService) { }

  public createAbenteuer(data): Observable<any> {
    return this.restService.post(`abenteuer/${data.gruppe}/${data.kampagne}/${data.name}/${data.ap}`, data);
  }

  public getAbenteuerForGruppe(gruppeid: number): Observable<AbenteuerDto[]> {
    return this.restService.get('abenteuer/gruppe/' + gruppeid);
  }

  public getAbenteuerForKampagne(kampagneid: number): Observable<AbenteuerDto[]> {
    return this.restService.get('abenteuer/kampagne/' + kampagneid);
  }

  public deleteAbenteuer(id): Observable<void> {
    return this.restService.delete('abenteuer/' + id);
  }

  public getAbenteuer(id): Observable<AbenteuerDto> {
    return this.restService.get('abenteuer/' + id);
  }

  public canEdit(abenteuer: AbenteuerDto): boolean {
    const id = abenteuer.gruppeId;
    return this.gruppenService.hasEditRight(id);
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
    return this.restService.delete(`abenteuer/${abenteuerid}/bonus/ap/${heldname}/${name}`);
  }


}
