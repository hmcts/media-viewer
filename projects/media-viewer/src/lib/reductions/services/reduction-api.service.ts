import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, delay, map} from 'rxjs/operators';
import {AnnotationSet} from '../../annotations/annotation-set/annotation-set.model';

@Injectable()
export class ReductionApiService {

  public redactionApiUrl = '/api/markups/';
  public redactApiUrl = '/api/redaction/';

  private annotationSetBaseUrl = '/annotation-sets';
  private annotationBaseUrl = '/annotations';

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  public getReductions(documentId: string): Observable<any> { // todo add model
    const fixedUrl = `${this.redactionApiUrl}${documentId}`;
    return this.httpClient
      .get<AnnotationSet>(fixedUrl, { observe: 'response' , withCredentials: true });
  }

  // @ts-ignore
  public saveReduction(body): Observable<any> {
    return this.httpClient
      .post<AnnotationSet>(this.redactionApiUrl, body, { observe: 'response' , withCredentials: true })
      .pipe(
        map(response => response.body),
        catchError(() => [])
      );
  }

  public deleteRedaction(payload): Observable<null> {
    const url = `${this.redactionApiUrl}/${payload.redactionId}`;

    return this.httpClient
      .delete<null>(url, { observe: 'response' , withCredentials: true })
      .pipe(map(response => response.body));
  }

  public deleteAllMarkers(payload): Observable<null> {
    const url = `${this.redactionApiUrl}/${payload}`;

    return this.httpClient
      .delete<null>(url, { observe: 'response' , withCredentials: true })
      .pipe(map(response => response.body));
  }

  public redact(payload): Observable<null> {
    return this.httpClient
      .post<AnnotationSet>(this.redactApiUrl, payload, { observe: 'response' , withCredentials: true })
      .pipe(
        map(response => response.body),
        catchError(() => [])
      );
  }

  get annotationSetsFullUrl() {
    return this.redactionApiUrl + this.annotationSetBaseUrl;
  }

}