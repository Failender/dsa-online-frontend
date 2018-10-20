import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Message} from 'primeng/api';
import {UserAuthentication} from './UserAuthentication';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {SessionService} from "../session/session.service";
import {HeldenService} from '../../meine-helden/helden.service';
import {ActivatedRoute} from "@angular/router";
import {NEVER, never, Observable, of} from 'rxjs';
import {flatMap} from 'tslint/lib/utils';
import {mergeMap} from 'rxjs/internal/operators';

export const MEISTER = 'MEISTER';
export const FULL_IMPORT = 'FULL_IMPORT';
export const CREATE_USER = 'CREATE_USER';
export const FULL_EXPORT = 'FULL_EXPORT';

@Injectable()
export class AuthenticationService {

  public onLogin = new EventEmitter<void>();
  public onLogout = new EventEmitter<void>();

  public rights: string[] = [];

  public authenticated;

  constructor(private restService: RestService, private messageService: MessageService,
              private sessionService: SessionService, private heldenService: HeldenService) {
    this.onLogout.subscribe(() => heldenService.held = null);
  }

  get authentication(): UserAuthentication {
    return this.restService.authentication;
}

  public authenticate(authentication: UserAuthentication): Observable<string[]> {
    this.restService.authentication = authentication;
    return this.restService.get('user/login')
      .pipe(catchError((e) => this.handleAuthenticationError(e)))
      .pipe(
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
    return NEVER;
  }

  public logout() {
    this.heldenService.held = null;
    this.authenticated = false;
    this.restService.authentication = null;

    this.onLogout.emit();
    this.rights = [];
  }

  public initialize(): Promise<any> {
    const url = window.location.toString();
    const heldid = getQueryVariableInt('held');
    const version = getQueryVariableInt('version');




    if (this.sessionService.userAuthentication.value) {
      if (heldid && version) {
        return this.authenticate(this.sessionService.userAuthentication.value)
          .pipe(mergeMap(() => this.heldenService.loadHeld(heldid, version)),
            catchError(this.handleError))
          .toPromise();
      }
      return this.authenticate(this.sessionService.userAuthentication.value)
        .pipe(catchError(this.handleError))
        .toPromise();
    } else {
      if (heldid && version) {
        return this.heldenService.loadHeld(heldid, version)
          .pipe(catchError(this.handleError))
          .toPromise();
      }
      return Promise.resolve([]);
    }
  }

  handleError() {
    return of([]);
  }

}


export function init(authenticationService: AuthenticationService) {

  return () => authenticationService.initialize();
}

export function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

export function getQueryVariableInt(variable) {
  return parseInt(getQueryVariable(variable), 10);
}
