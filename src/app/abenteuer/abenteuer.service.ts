import { Injectable } from '@angular/core';
import {RestService} from "../service/rest/rest.service";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AbenteuerService {

  constructor(private restService: RestService) { }

  public createAbenteuer(data): Observable<any> {
    return this.restService.post(`abenteuer/${data.gruppe}/${data.kampagne}/${data.name}/${data.ap}`, data);
  }

  public getAbenteuerForGruppe(gruppeid: number): Observable<any[]> {
    return this.restService.get('abenteuer/gruppe/' + gruppeid);
  }

  public deleteAbenteuer(id): Observable<void> {
    return this.restService.delete('abenteuer/' + id);
  }

  public getAbenteuer(id): Observable<any> {
    return this.restService.get('abenteuer/' + id);
  }
}
