import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RestService} from '../service/rest/rest.service';
import {SelectItem} from 'primeng/api';
import {HeldenInfo} from './helden.service';

@Injectable()
export class GruppenService {

  constructor(private restService: RestService) { }


  public getGruppen(): Observable<SelectItem[]> {
    return this.restService.get('gruppen');
  }

  public getGruppenIncludingHeld(publicOnly: boolean, showInactive: boolean): Observable<GruppeIncludingHeld[]> {
    return this.restService.get(`gruppen/includeHelden?publicOnly=${publicOnly}&showInactive=${showInactive}`);
  }


  public updateGruppe(heldid: number, gruppeid: number): Observable<void> {
    return this.restService.post('gruppen/' + heldid + '/' + gruppeid, null);
  }

  public getHeldenForGruppe(gruppeid: number ): Observable<any> {
    return this.restService.get('gruppen/helden/' + gruppeid);
  }
}

export interface GruppeIncludingHeld {
  name: string;
  id: number;
  helden: HeldenInfo[];
}
