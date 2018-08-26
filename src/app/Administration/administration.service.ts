import { Injectable } from '@angular/core';
import {RestService} from '../service/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private restService: RestService) { }


  public getStatistics() {
    return this.restService.get('administration/statistics');
  }


}
