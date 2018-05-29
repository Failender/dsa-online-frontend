import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../service/rest/rest.service';
import {SelectItem} from 'primeng/api';
import {HeldenInfo} from './helden.service';

@Injectable()
export class GruppenService {

  constructor(private restService: RestService) { }


  public getGruppen(): Observable<SelectItem[]> {
    return this.restService.get('gruppen');
  }

  public getGruppenIncludingHeld(): Observable<GruppeIncludingHeld[]> {
    return this.restService.get('gruppen/includeHelden');
  }

  public getGruppenIncludingHeldPublic(): Observable<GruppeIncludingHeld[]> {
    return this.restService.get('gruppen/includeHelden/public');
  }

  public updateGruppe(heldid: number, gruppeid: number): Observable<void> {
    return this.restService.post('gruppen/' + heldid + '/' + gruppeid, null);
  }
}

export interface GruppeIncludingHeld {
  name: string;
  id: number;
  helden: HeldenInfo[];
}
