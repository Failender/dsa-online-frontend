import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {Message} from 'primeng/api';
import {UserAuthentication} from './UserAuthentication';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message/message.service';


@Injectable()
export class AuthenticationService {

  public onLogin = new EventEmitter<void>();
  public onLogout = new EventEmitter<void>();

  private _authenticated;

  constructor(private restService: RestService, private messageService: MessageService) {
  }

  public authenticate(authentication: UserAuthentication): Observable<Response> {
    return this.restService.post('login', authentication)
      .pipe(catchError(this.handleAuthenticationError))
      .pipe(tap( () => this._authenticated = true))
      .pipe(tap( () => this.onLogin.emit()));
  }

  private handleAuthenticationError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.status === 403) {
      errorMsg = 'Falsche Logindaten';
    } else {
      console.error(error)

      errorMsg = 'Unerwarteter Fehler:  ' + error.message;
    }
    const msg: Message = {
      severity: 'error',
      summary: errorMsg
    }
    this.messageService.add(msg)
    return Observable.throw(errorMsg);
  }

  public logout() {
    this._authenticated = false;
    this.restService.authentication = null;
  }

}
