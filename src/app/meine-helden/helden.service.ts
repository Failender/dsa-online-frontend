import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../service/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class HeldenService {

  constructor(private restService: RestService) {

  }

  public held: any;
  public versionInfo;

  public heldLoaded = new EventEmitter();

  public getMeineHelden(): Observable<HeldenInfo[]> {
    return this.restService.get('helden');
  }

  public loadHeld(id: number, version: number): Observable<any> {
    return this.restService.get('helden/held/' + id + '/' + version)
      .pipe(tap((data) => {
        this.versionInfo = {
          id, version
        }
        this.held = data;
        this.heldLoaded.emit();
      }));
  }

  public reloadHelden() {
    return this.restService.get('helden/reload');
  }
}

export interface HeldenInfo {
  gruppe: string;
  heldenid: number;
  name: string;
  lastChanged: number;
  id: number;
  version: number;
}
