import {Injectable} from '@angular/core';
import {RestService} from 'dsa-components';
import {Observable} from "rxjs/index";

@Injectable()
export class AdministrationService {

  constructor(private restService: RestService) { }


  public getStatistics(): Observable<any> {
    return this.restService.get('administration/statistics');
  }

  public addMeister(gruppeid, userid): Observable<any> {
    return this.restService.post(`meister/gruppe/${gruppeid}/${userid}`, null);
  }

  public removeMeister(gruppeid, userid): Observable<any> {
    return this.restService.delete(`meister/gruppe/${gruppeid}/${userid}`);
  }

  public getMeisterForGruppe(gruppeid): Observable<any> {
    return this.restService.get(`meister/gruppe/${gruppeid}`);
  }


}
