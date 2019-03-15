import { Injectable } from '@angular/core';



import {RestService} from 'dsa-components';
import {Observable} from "rxjs";


export interface Asset {
  id: number;
  kampagne: number;
  name: string;
  filename: string;
  hidden: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private restService: RestService) { }


  public assetsForKampagne(kampagne: number): Observable<Asset[]> {
    return this.restService.get(`assets/kampagne/${kampagne}`);
  }

  public deleteImage(id) {
    return this.restService.delete(`assets/${id}`);
  }
}
