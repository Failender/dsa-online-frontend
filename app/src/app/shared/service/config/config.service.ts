import {Injectable} from '@angular/core';
import {RestService} from 'dsa-components';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private restService: RestService) { }

  public getVersions() {
    return this.restService.get('config/version');
  }
}
