import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../service/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class HeldenService {

  constructor(private restService: RestService) { }

  public held: any;

  public heldLoaded = new EventEmitter();

  public getMeineHelden(): Observable<HeldenInfo[]> {
    return this.restService.get('helden');
  }

  public loadHeld(id: number) {
    this.restService.get('helden/held/' + id)
      .subscribe(data => {
          this.held = data;
          this.heldLoaded.emit();
        });
  }

}

export interface HeldenInfo {
  heldenid: number;
  name: string;
  lastChanged: number;
  id: number
}
