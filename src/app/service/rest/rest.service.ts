import { Injectable } from '@angular/core';
import {UserAuthentication} from '../authentication/UserAuthentication';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message/message.service';

@Injectable()
export class RestService {

  private USERNAME = 'X-USER';
  private PASSWORD = 'X-PASSWORD';

  public authentication: UserAuthentication;
  constructor(private http: HttpClient, private messageService: MessageService) {
  }


  public get(adress: string, asResponse?: boolean) {
    return this.http.get(environment.rest + adress, this.buildOptions(asResponse))
      .pipe(catchError(this.handleError));
  }

  public  post(adress: string, body: any, asResponse?: boolean) {
    return this.http.post(environment.rest + adress, body, this.buildOptions(asResponse))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    this.messageService.add({severity: 'error', summary: error.message})
    return Observable.throw(error);
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
    const header: HttpHeaders = new HttpHeaders();
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
