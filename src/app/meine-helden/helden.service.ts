import {Injectable} from '@angular/core';
import {RestService} from '../shared/service/rest/rest.service';
import {Observable, ReplaySubject} from "rxjs";
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
          id, version, edit: data.editable
        }
        this.held = data.daten;
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

  public getSteigerungen(heldid) {
    return this.restService.get(`steigern/${heldid}/steigerungen`);
  }

  public getInventar(heldid) {
    return this.restService.get(`helden/held/${heldid}/inventar`);
  }

  public removeItem(heldid, index) {
    return this.restService.delete(`helden/held/${heldid}/inventar/${index}`);
  }

  public addItem(heldid, name: string, amount: number) {
    return this.restService.post(`helden/held/${heldid}/inventar/add/${encodeURI(name)}/${amount}`);
  }

  public changeLernmethode(heldid: number, talent: string, lernmethode: string) {
    return this.restService.post(`steigern/${heldid}/steigern/lernmethode`, {talent, lernmethode});
  }

  public steigern(heldid: number, talent: string, aktwert: number) {
    return this.restService.post(`steigern/${heldid}/steigern/${encodeURI(talent)}/${aktwert}`);
  }

  public getApUncached(heldid: number) {
    return this.restService.get(`steigern/${heldid}/ap`);
  }

  public addEreignis(heldid: number, name: string, ap: number) {
    return this.restService.post(`steigern/${heldid}/ereignis/${encodeURI(name)}/${ap}`);
  }

  public getLagerorte(heldid: number) {
    return this.restService.get(`helden/held/${heldid}/lagerorte`);
  }

  public addLagerort(heldid: number, lagerort) {
    return this.restService.post(`helden/held/${heldid}/lagerort`, lagerort);
  }




}

export interface HeldenInfo {
  gruppe: string;
  name: string;
  lastChanged: number;
  id: number;
  version: number;
}
