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
}


export interface Skript {
  name: string;
  id: number;
  body: string;
  scriptVariables: SkriptVariable[];
}

export interface SkriptVariable {
  id: number;
  scriptId: number;
  name: string;
  type: string;
  value: string;
}
