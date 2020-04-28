import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { IcpWebsocketService } from '../../providers/icp-websocket-service';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import { IcpSession } from '../reducers/icp.reducer';
import * as icpActions from '../actions/icp.action' ;
import {of} from 'rxjs';

@Injectable()
export class IcpEffects {

  constructor(private actions$: Actions,
              private icpWebsocketService: IcpWebsocketService) {}

  @Effect()
  createIcpSession$ = this.actions$.pipe(
    ofType(icpActions.CREATE_ICP_SESSION),
    map((action: icpActions.CreateIcpSession) => action.payload),
    exhaustMap((icpSession: IcpSession) =>
      this.icpWebsocketService.createSession(icpSession)
        .pipe(
          map(res => new icpActions.CreateIcpSessionSuccess(res)),
          catchError(error => of(new icpActions.CreateIcpSessionFailure(error)))
        )
    ));
}

