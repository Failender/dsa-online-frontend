import { Injectable } from '@angular/core';
import {RestService} from '../../service/rest/rest.service';
import {Observable} from 'rxjs';

@Injectable()
export class VersionService {

  constructor(private restService: RestService) { }


  public getVersionen(heldversion: number): Observable<any[]> {
    return this.restService.get('helden/held/versionen/' + heldversion);
  }

  public deleteVersion(heldid: number, version: number): Observable<void> {
    return this.restService.delete(`helden/held/${heldid}/${version}`);
  }

}
