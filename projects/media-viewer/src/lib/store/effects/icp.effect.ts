import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { IcpApiService } from '../../providers/icp-api-service';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import { IcpSession } from '../reducers/icp.reducer';
import * as icpActions from '../actions/icp.action' ;
import {of} from 'rxjs';

@Injectable()
export class IcpEffects {

  constructor(private actions$: Actions,
              private icpApiService: IcpApiService) {}

  @Effect()
  createIcpSession$ = this.actions$.pipe(
    ofType(icpActions.CREATE_ICP_SESSION),
    map((action: icpActions.CreateIcpSession) => action.payload),
    exhaustMap((icpSession: IcpSession) =>
      this.icpApiService.createSession(icpSession)
        .pipe(
          map(res => new icpActions.CreateIcpSessionSuccess(res)),
          catchError(error => of(new icpActions.CreateIcpSessionFailure(error)))
        )
    ));


  @Effect()
  loadIcpSession$ = this.actions$.pipe(
    ofType(icpActions.LOAD_ICP_SESSION),
    map((action: icpActions.LoadIcpSession) => action.payload),
    exhaustMap((id: string) =>
      this.icpApiService.loadSession(id)
        .pipe(
          map(res => new icpActions.LoadIcpSessionSuccess(res)),
          catchError(error => of(new icpActions.LoadIcpSessionFailure(error)))
        )
    ));
}

