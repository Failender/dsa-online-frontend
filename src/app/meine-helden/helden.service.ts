import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../service/rest/rest.service';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {AuthenticationService} from '../service/authentication/authentication.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class HeldenService {

  constructor(private restService: RestService) {

  }

  public held: any;
  public versionInfo;

  private _heldLoaded = new ReplaySubject<any>();

  public heldLoaded = this._heldLoaded.asObservable();

  public getMeineHelden(): Observable<HeldenInfo[]> {
    return this.restService.get('helden');
  }

  public getPublicHelden(): Observable<HeldenInfo[]> {
    return this.restService.get('helden');
  }

  public loadHeld(id: number, version: number): Observable<any> {

    return this.restService.get('helden/held/' + id + '/' + version)
      .pipe(tap((data) => {
        this.versionInfo = {
          id, version
        }
        this.held = data;
        this._heldLoaded.next();
      }));
  }

  public reloadHelden() {
    return this.restService.get('helden/reload');
  }

  public updatePublic(id: number, value: boolean) {
    return this.restService.post(`helden/public/${id}/${value}`, {});
  }

  public updateActive(id: number, value: boolean) {
    return this.restService.post(`helden/active/${id}/${value}`, {});
  }

  public compareHeldVersionen(id: number, from: number, to: number): Observable<any> {
    return this.restService.get(`helden/held/unterschied/${id}/${from}/${to}`);
  }

  public getHeldDifferences(id: number, from: number, to: number): Observable<any> {
    return this.restService.get(`helden/held/differences/${id}/${from}/${to}`);
  }

}

export interface HeldenInfo {
  gruppe: string;
  name: string;
  lastChanged: number;
  id: number;
  version: number;
}
