import { Injectable } from '@angular/core';
import {RestService} from "../service/rest/rest.service";
import {Observable} from "rxjs/index";
import {SelectItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SkriptService {

  constructor(private restService: RestService) { }

  public getSkripte(): Observable<Skript[]> {
    return this.restService.get('scripts/all');
  }

  public getTypes(): Observable<any> {
    return this.restService.get('scripts/types');
  }

  public getResultTypes(): Observable<any> {
    return this.restService.get('scripts/result/types');
  }

  public getHelper(): Observable<any> {
    return this.restService.get('scripts/helper');
  }

  public test(script: Skript) {
    return this.restService.post('scripts/test', script);
  }
  public save(script: Skript) {
    return this.restService.post('scripts/save', script);
  }

  public execute(id) {
    return this.restService.get('scripts/execute/' + id);
  }
}


export interface Skript {
  name: string;
  id: number;
  body: string;
  scriptVariables: SkriptVariable[];
  resultType: number;
  scriptHelper: string[];
}

export interface SkriptVariable {
  id?: number;
  scriptId?: number;
  name: string;
  type: string;
  value: string;
}
