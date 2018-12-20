import {EventEmitter, Injectable} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Message} from 'primeng/api';
import {Userauthentication} from './userauthentication';
import {catchError, flatMap, tap} from "rxjs/operators";
import {MessageService} from '../message/message.service';
import {SessionService} from "../session/session.service";
import {HeldenService} from '../../../meine-helden/helden.service';
import {NEVER, Observable, of, ReplaySubject} from "rxjs";
import {mergeMap} from 'rxjs/internal/operators';
import {GruppenService} from "../../gruppen.service";

export const MEISTER = 'MEISTER';
export const FULL_IMPORT = 'FULL_IMPORT';
export const CREATE_USER = 'CREATE_USER';
export const FULL_EXPORT = 'FULL_EXPORT';
export const EDIT_KAMPAGNE = 'EDIT_KAMPAGNE';

@Injectable()
export class AuthenticationService {

  public onLogin = new ReplaySubject<void>();
  public onLogout = new EventEmitter<void>();

  public rights: string[] = [];

  public authenticated;

  public initialized = new ReplaySubject();

  constructor(private restService: RestService, private messageService: MessageService,
              private sessionService: SessionService, private heldenService: HeldenService) {
    this.onLogout.subscribe(() => heldenService.held = null);
    this.doInit();
  }

  get authentication(): Userauthentication {
    return this.restService.authentication;
}

  public authenticate(authentication: Userauthentication): Observable<string[]> {
    this.restService.authentication = authentication;
    return this.restService.get('user/login', false, e => {
      return this.handleAuthenticationError(e);
    })
      .pipe(
        tap((data: string[]) => this.rights = data),
        tap( () => this.authenticated = true),
        tap( () => this.messageService.info('Einloggt als ' + authentication.username)),
        tap( () => this.onLogin.next()));
  }

  private handleAuthenticationError(error: HttpErrorResponse) {
    let errorMsg = '';
    console.debug(error)
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

  public doInit() {
    this.initialize()
      .subscribe(() => this.initialized.next());
  }

  public initialize(): Observable<any> {
    const heldid = getQueryVariableInt('held');
    const version = getQueryVariableInt('version');
    if (this.sessionService.userAuthentication.value) {
      if (heldid && version) {
        return this.authenticate(this.sessionService.userAuthentication.value)
          .pipe(mergeMap(() => this.heldenService.loadHeld(heldid, version)),
            catchError(this.handleError));
      }
      return this.authenticate(this.sessionService.userAuthentication.value)
        .pipe(catchError(this.handleError));
    } else {
      if (heldid && version) {
        return this.heldenService.loadHeld(heldid, version)
          .pipe(catchError(this.handleError));
      }
      return of([]);
    }
  }

  handleError() {
    return of([]);
  }
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
