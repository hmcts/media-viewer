import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IcpSession } from '../store/reducers/icp.reducer';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class IcpApiService {

  private ICP_SESSION_API = '/icp/sessions';

  constructor(private readonly httpClient: HttpClient) {}

  public createSession(icpSession: Partial<IcpSession>): Observable<IcpSession> {
    return this.httpClient
      .post<IcpSession>(this.ICP_SESSION_API, icpSession,
        { observe: 'response' , withCredentials: true })
      .pipe(map(response => response.body));
  }

  public loadSession(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.ICP_SESSION_API}/${id}`,
        { observe: 'response' , withCredentials: true })
      .pipe(map(response => response.body));
  }
}
