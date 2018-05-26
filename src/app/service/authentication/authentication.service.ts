import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {Observable} from 'rxjs/Rx';
import {HttpErrorResponse} from '@angular/common/http';
import {Message} from 'primeng/api';
import {UserAuthentication} from './UserAuthentication';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {SessionService} from "../session/session.service";
import {HeldenService} from '../../meine-helden/helden.service';


@Injectable()
export class AuthenticationService {

  public onLogin = new EventEmitter<void>();
  public onLogout = new EventEmitter<void>();

  public rights: string[] = [];

  public authenticated;

  constructor(private restService: RestService, private messageService: MessageService,
              private sessionService: SessionService, private heldenService: HeldenService) {
  }

  get authentication(): UserAuthentication {
    return this.restService.authentication;
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
    this.heldenService.held = null;
    this.authenticated = false;
    this.restService.authentication = null;

    this.onLogout.emit();
    this.rights = [];
  }

  public initialize(): Promise<any> {
    if (this.sessionService.userAuthentication.value) {
      return this.authenticate(this.sessionService.userAuthentication.value)
        .pipe(catchError(this.handleError))
        .toPromise();
    } else {
      return Promise.resolve([]);
    }
  }

  handleError() {
    return Observable.of([]);
  }

}


export function init(authenticationService: AuthenticationService) {

  return () => authenticationService.initialize();
}
