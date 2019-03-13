import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {NEVER, Observable, throwError,} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Userauthentication} from "./userauthentication";
import {MessageService} from "./message.service";

export const REST_URI_TOKEN = new InjectionToken('REST_URI')

@Injectable()
export class RestService {

  private USERNAME = 'X-USER';
  private PASSWORD = 'X-PASSWORD';

  public authentication: Userauthentication;
  constructor(private http: HttpClient, private messageService: MessageService, @Inject(REST_URI_TOKEN) private restUri: string) {
  }


  public get(adress: string, asResponse?: boolean, handler?: any) {
    return this.http.get(this.restUri + adress, this.buildOptions(asResponse))
      .pipe(catchError((e) => this.handleError(e, handler)));
  }

  public delete(adress: string, asResponse?: boolean) {
    return this.http.delete(this.restUri+ adress, this.buildOptions(asResponse))
      .pipe(catchError((e) => this.handleError(e)));
  }

  public post(adress: string, body?: any, asResponse?: boolean) {
    return this.http.post(this.restUri+ adress, body, this.buildOptions(asResponse))
      .pipe(catchError((event) => this.handleError(event)));
  }

  public put(adress: string, body?: any, asResponse?: boolean) {
    return this.http.put(this.restUri + adress, body, this.buildOptions(asResponse))
      .pipe(catchError((event) => this.handleError(event)));
  }

  private handleError(error: HttpErrorResponse, handler?: any): Observable<any> {
    if (handler) {
      return handler(error);
    }
    if (error.status === 0 || error.status === 502) {
      this.messageService.error('Server nicht erreichbar');
      return NEVER;
    }
    else if (error.status === 401) {
      this.messageService.error('Sie haben nicht das Recht dies zu tun');
    } else if (error.status === 500) {
      this.messageService.error('Unerwarteter Fehler.');
    }
    else if (error.status === 404) {
      this.messageService.error("Die angefragte Entität konnte nicht gefunden werden");
      return NEVER;
    } else if (error.status === 409) {
      this.messageService.error("Für diese Anfrage wird ein Token mit Schreibrecht benötigt");
      return NEVER;
    }
    return throwError(error);
  }

  private buildOptions(asResponse?: boolean): any {
    const ret = {
      headers: this.buildHeader()
    }
    if (asResponse) {
      ret['observe'] = 'response';
    }
    return ret;
  }

  private buildHeader(): HttpHeaders {
    let header: HttpHeaders = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.appendAuthorization(header);
  }

  private appendAuthorization(header: HttpHeaders): HttpHeaders {
    if (!header ) {
      header = new HttpHeaders();
    }
    if (this.authentication) {
      return header.append(this.USERNAME, this.authentication.username).
        append(this.PASSWORD, this.authentication.password);
    } else {
      return header;
    }

  }
}
