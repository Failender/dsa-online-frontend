import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {RestService} from '../service/rest/rest.service';
import {SelectItem} from 'primeng/api';
import {HeldenInfo} from '../meine-helden/helden.service';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {filter} from "rxjs/internal/operators";


export interface GruppeInfo {
  id: number;
  meister: boolean;
  userGroup: boolean;
}
export interface GruppeSelectItem extends SelectItem {
  value: GruppeInfo;
}

@Injectable()
export class GruppenService {

  private currentGroup = new BehaviorSubject<GruppeInfo>(null);
  private groups = new BehaviorSubject<GruppeSelectItem[]>(null);
  private meisterGroups = new ReplaySubject<GruppeSelectItem[]>();
  constructor(private restService: RestService, authService: AuthenticationService) {
    this.getGruppen(true)
      .subscribe(data => this.groups.next(data));
    authService.onLogin.subscribe(() => {
      this.getMeisterGruppen()
        .subscribe(data => this.meisterGroups.next(data));
      })
    authService.onLogout.subscribe(() => {
      this.meisterGroups.next([]);
    });

  }

  public forceRefresh() {
    this.currentGroup.next(this.currentGroup.value);
  }
  public getGruppen(appendMeisterInfo?: boolean): Observable<SelectItem[]> {
    let url = 'gruppen';
    if (appendMeisterInfo) {
      url += '?meisterinfo=' + appendMeisterInfo;
    }
    return this.restService.get(url);
  }

  public getMeisterGruppen(): Observable<SelectItem[]> {
    return this.restService.get('gruppen/bymeister');
  }

  public getAllGruppenWhereCurrentUserCanEditMeister(): Observable<SelectItem[]> {
    return this.restService.get('gruppen/editable/meister');
  }

  public getGruppenIncludingHeld(publicOnly: boolean, showInactive: boolean): Observable<GruppeIncludingHeld[]> {
    return this.restService.get(`gruppen/includeHelden?publicOnly=${publicOnly}&showInactive=${showInactive}`);
  }

  public getGruppeIncludingHeld(gruppeid: number, publicOnly: boolean, showInactive: boolean): Observable<GruppeIncludingHeld> {
    return this.restService.get(`gruppen/${gruppeid}/includeHelden?publicOnly=${publicOnly}&showInactive=${showInactive}`);
  }


  public updateGruppe(heldid: number, gruppeid: number): Observable<void> {
    return this.restService.post('gruppen/' + heldid + '/' + gruppeid, null);
  }

  public getHeldenForGruppe(gruppeid: number ): Observable<any> {
    return this.restService.get('gruppen/helden/' + gruppeid);
  }

  public getGroups() {
    return this.groups.asObservable().pipe(filter(val => val !== null));
  }

  public setGroupById(id: number) {
    const group = this.groups.value.find(val => val.value.id === id).value;
    if (group) {
      this.setCurrentGroup(group);
    }
  }

  public getMeisterGroups() {
    return this.meisterGroups.asObservable();
  }

  public getCurrentGroup(): Observable<GruppeInfo> {
    return this.currentGroup.asObservable().pipe(filter(value => value !== null));
  }

  public getCurrentGroupValue(): GruppeInfo {
    const val = this.currentGroup.getValue();
    if (!val) {
      throw new Error('Keine Gruppe gewählt');
    }
    return val;
  }

  public setCurrentGroup(group: GruppeInfo) {
    this.currentGroup.next(group);
  }
}

export interface GruppeIncludingHeld {
  name: string;
  id: number;
  helden: HeldenInfo[];
}
