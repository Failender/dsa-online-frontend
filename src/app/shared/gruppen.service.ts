import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RestService} from './service/rest/rest.service';
import {SelectItem} from 'primeng/api';
import {HeldenInfo} from '../meine-helden/helden.service';
import {AuthenticationService} from "./service/authentication/authentication.service";
import {filter, first, tap} from "rxjs/internal/operators";


export interface GruppeInfo {
  id: number;
  meister: boolean;
  userGroup: boolean;
  name: string;
  image: string;
}
export interface GruppeSelectItem extends SelectItem {
  value: GruppeInfo;
}

@Injectable()
export class GruppenService {

  private currentGroup = new BehaviorSubject<GruppeInfo>(null);
  private _groupValues: GruppeSelectItem[];
  private groups = new BehaviorSubject<GruppeSelectItem[]>(null);
  constructor(private restService: RestService, authService: AuthenticationService) {
    authService.initialized
      .pipe(first())
      .subscribe(() => this.initGruppen().subscribe())
    authService.onLogout.subscribe(() => {
      this.initGruppen().subscribe();
    });
    authService.onLogin.asObservable().subscribe(() => this.initGruppen().subscribe());

  }

  set groupValues(value) {
    this._groupValues = value;
    this.groups.next(value);
  }

  get groupValues() {
    return this._groupValues;
  }

  public initGruppen(): Observable<any> {
    return this.getGruppen(true)
      .pipe(tap(data => this.groupValues = data));

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

  public getAllGruppenWhereCurrentUserCanEditMeister(): Observable<SelectItem[]> {
    return this.restService.get('gruppen/editable/meister');
  }

  public getGruppe(id: number) {
    const val = this.groupValues.find(value => value.value.id === id);
    if (!val) {
      console.trace('Cant find gruppe with id ' + id);
      return null;
    }
    return val.value;
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

  public getHeldenForGruppe(gruppeid: number, dropdown = false, showInactive = false ): Observable<any> {
    return this.restService.get('gruppen/helden/' + gruppeid + "?dropdown=" + dropdown + '&showInactive=' + showInactive);
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

  public hasEditRight(gruppeid) {
    return this.getGruppe(gruppeid).meister;
  }

  public updateGruppeImage(gruppeid:  number, image: string) {
    return this.restService.post(`gruppen/${gruppeid}/image/`, image);
  }


}

export interface GruppeIncludingHeld {
  name: string;
  id: number;
  helden: HeldenInfo[];
}
