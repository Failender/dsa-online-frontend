import { Injectable } from '@angular/core';
import {RestService} from '../../shared/service/rest/rest.service';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  constructor(private restService: RestService) { }

  public createUser(data: any): Observable<void> {
    return this.restService.post('user/register', data);
  }

  public createUsers(data: any): Observable<void> {
    return this.restService.post('user/create', data);
  }

  public getAllUser(): Observable<any> {
    return this.restService.get('user');
  }

}
