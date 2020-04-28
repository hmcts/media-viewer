import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IcpSession} from '../store/reducers/icp.reducer';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class IcpWebsocketService {

  private icpSessionUrl = '/icp/sessions';

  constructor(private readonly httpClient: HttpClient) {}

  public createSession(icpSession: Partial<IcpSession>): Observable<IcpSession> {
    return this.httpClient
      .post<IcpSession>(this.icpSessionUrl, icpSession, { observe: 'response' , withCredentials: true })
      .pipe(map(response => response.body));
  }
}
