import {Injectable} from '@angular/core';
import {RestService} from '../../shared/service/rest/rest.service';

@Injectable()
export class HeldGeldService {

  constructor(private restService: RestService) {

  }

  public getMuenzen(heldid: number) {
    return this.restService.get(`geld/${heldid}`);
  }

  public getWaehrungen() {
    return this.restService.get('geld/waehrungen');
  }

  public addWaehrung(heldid: number, data) {
    return this.restService.post(`geld/${heldid}/add`, data);
  }

}
