import { Injectable } from '@angular/core';
import {RestService} from '../service/rest/rest.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private restService: RestService) { }

  public createUser(data: any): Observable<void> {
    return this.restService.post('user/register', data);
  }

  public createUsers(data: any): Observable<void> {
    return this.restService.post('user/create', data);
  }

}
