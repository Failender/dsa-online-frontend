import {Injectable} from "@angular/core";

import {RestService} from 'dsa-components';
import {Observable} from "rxjs";

@Injectable()
export class KampfService {

  constructor(private restService: RestService) {
  }


  public startKampf(gruppe: number, kampf: Kampf): Observable<Kampf> {
    return this.restService.post(`kampf/start/${gruppe}`, kampf);
  }

  public getKampfForGruppe(gruppe: number): Observable<Kampf> {
    return this.restService.get(`kampf/gruppe/${gruppe}`);
  }

  public updateGegnerPosition(kampfid: number, gegner: Gegner) {
    return this.restService.put(`kampf/${kampfid}/gegner`, gegner);
  }

  public addComponent(kampfid: number, component: KampfComponent) {
    return this.restService.post(`kampf/${kampfid}/component`, component);
  }

  public updateComponent(kampfid: number, component: KampfComponent) {
    const konva = component.konva;
    delete component.konva;
    const obs = this.restService.put(`kampf/${kampfid}/component`, component);
    component.konva = konva;
    return obs;
  }




}


export interface Kampf {
  gruppe?: number;
  id?: number;
  gegner?: Gegner[];
  readonly?: boolean;
  image?: string;
  components?: KampfComponent[];
}

export interface KampfComponent {
  type: string;
  x: number;
  y: number;
  parameter: any;
  id?: number;
  konva?: any;
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
