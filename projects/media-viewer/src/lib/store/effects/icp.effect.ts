import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IcpApiService } from '../../providers/icp-api.service';
import { IcpSession } from '../reducers/icp.reducer';
import { IcpWebsocketService } from '../../providers/icp-websocket.service';
import * as icpActions from '../actions/icp.action' ;

@Injectable()
export class IcpEffects {

  constructor(private actions$: Actions,
              private icpApiService: IcpApiService,
              private icpService: IcpWebsocketService) {}

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


  @Effect({dispatch: false})
  updateIcpScreen = this.actions$.pipe(
    ofType(icpActions.UPDATE_ICP_SCREEN),
    map((action: icpActions.UpdateIcpScreen) => action.payload),
    tap((screen) => this.icpService.updateScreen(screen))
  );


  @Effect()
  icpScreenUpdated = this.actions$.pipe(
    ofType(icpActions.ICP_SCREEN_UPDATED),
    map((action: icpActions.IcpScreenUpdated) => action.payload),
    exhaustMap((id: string) =>
    this.icpService.screenUpdated(id)
      .pipe(
        map(res => new icpActions.IcpScreenUpdatedSuccess(res)),
        catchError(error => of(new icpActions.IcpScreenUpdatedFailure(error)))
      )
  ));
}

