import { Injectable } from '@angular/core';
import {RestService} from '../../service/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private restService: RestService) { }

  public getVersions() {
    return this.restService.get('config/version');
  }
}
