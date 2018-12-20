import { Injectable } from '@angular/core';
import {RestService} from "../shared/service/rest/rest.service";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private restService: RestService) { }


  public getKampagnen(gruppeid: number): Observable<any[]> {

    return this.restService.get(`kampagnen/${gruppeid}`);
  }

  public createKampagne(name: string, gruppeId : number) {
    return this.restService.post(`kampagnen/create/${name}/${gruppeId}`, null);
  }

  public deleteKampagne(id: number) {
    return this.restService.delete(`kampagnen/kampagne/${id}`);
  }

  public getKampagne(id: number) {
    return this.restService.get(`kampagnen/kampagne/${id}`);
  }
}
