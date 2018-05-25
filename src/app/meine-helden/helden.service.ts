import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../service/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class HeldenService {

  constructor(private restService: RestService) { }

  public held: any;
  public versionInfo;

  public heldLoaded = new EventEmitter();

  public getMeineHelden(): Observable<HeldenInfo[]> {
    return this.restService.get('helden');
  }

  public loadHeld(id: number, version: number) {
    this.restService.get('helden/held/' + id + '/' + version)
      .subscribe(data => {
        this.versionInfo = {
          id, version
        }
          this.held = data;
          this.heldLoaded.emit();
        });
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
