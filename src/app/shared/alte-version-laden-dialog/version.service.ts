import { Injectable } from '@angular/core';
import {RestService} from '../../service/rest/rest.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VersionService {

  constructor(private restService: RestService) { }


  public getVersionen(heldversion: number): Observable<any[]> {
    return this.restService.get('helden/held/versionen/' + heldversion);
  }

}
