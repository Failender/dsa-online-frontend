import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {Message} from 'primeng/api';
import {UserAuthentication} from './UserAuthentication';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';


@Injectable()
export class AuthenticationService {

  public onLogin = new EventEmitter<void>();
  public onLogout = new EventEmitter<void>();

  public rights: string[] = [];

  public authenticated;

  constructor(private restService: RestService, private messageService: MessageService) {
  }

  public authenticate(authentication: UserAuthentication): Observable<string[]> {
    this.restService.authentication = authentication;
    return this.restService.get('user/login')
      .pipe(catchError((e) => this.handleAuthenticationError(e)),
        tap((data: string[]) => this.rights = data),
        tap( () => this.authenticated = true),
        tap( () => this.messageService.info('Einloggt als ' + authentication.username)),
        tap( () => this.onLogin.emit()));
  }

  private handleAuthenticationError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.status === 401) {
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
    return ErrorObservable.create(errorMsg);
  }

  public logout() {
    this.authenticated = false;
    this.restService.authentication = null;
    this.onLogout.emit();
    this.rights = [];

  }

}
