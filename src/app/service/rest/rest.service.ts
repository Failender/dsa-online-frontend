import { Injectable } from '@angular/core';
import {UserAuthentication} from '../authentication/UserAuthentication';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {never} from 'rxjs/observable/never';

@Injectable()
export class RestService {

  private USERNAME = 'X-USER';
  private PASSWORD = 'X-PASSWORD';

  public authentication: UserAuthentication;
  constructor(private http: HttpClient, private messageService: MessageService) {
  }


  public get(adress: string, asResponse?: boolean) {
    return this.http.get(environment.rest + adress, this.buildOptions(asResponse))
      .pipe(catchError((e) => this.handleError(e)));
  }

  public post(adress: string, body: any, asResponse?: boolean) {
    return this.http.post(environment.rest + adress, body, this.buildOptions(asResponse))
      .pipe(catchError((event) => this.handleError(event)));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {

    if (error.status === 0) {
      this.messageService.add({severity: 'error', summary: 'Server nicht erreichbar'});
      return never();
    }
    if(error.status === 401) {
      this.messageService.error('Sie haben nicht das Recht dies zu tun');
    }
    //this.messageService.add({severity: 'error', summary: error.message})
    return ErrorObservable.create(error);
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
