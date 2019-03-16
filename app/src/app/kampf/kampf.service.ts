import {Injectable} from "@angular/core";

import {RestService} from 'dsa-components';
import {Observable} from "rxjs";

@Injectable()
export class KampfService {

  constructor(private restService: RestService) {
  }


  public startKampf(gruppe: number): Observable<Kampf> {
    return this.restService.post(`kampf/start/${gruppe}`);
  }

  public getKampfForGruppe(gruppe: number): Observable<Kampf> {
    return this.restService.get(`kampf/gruppe/${gruppe}`);
  }

  public updateGegnerPosition(kampfid: number, gegner: Gegner) {
    return this.restService.put(`kampf/${kampfid}/gegner`, gegner);
  }


}


export interface Kampf {
  gruppe?: number;
  id?: number;
  gegner?: Gegner[];
  readonly?: boolean;
  image?: string;
}

export interface Gegner {
  id: number;
  icon: string;
  x: number;
  y: number;
  ally: boolean;
  hpPercentage: number;
  konva: any;
}

export interface UpdateTeilnehmerPosition {
  x: number;
  y: number;
  gegner: number;
}
