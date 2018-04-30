import { Injectable } from '@angular/core';
import {AuthenticationLocaleStorageObject} from './SessionObjects';

@Injectable()
export class SessionService {


  public userAuthentication = new AuthenticationLocaleStorageObject('USER-AUTH');

  constructor() { }

}
