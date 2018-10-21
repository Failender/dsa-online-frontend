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
}
