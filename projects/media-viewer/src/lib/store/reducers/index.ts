import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromAnnotation from './annotatons.reducer';
import {AnnotationSetState} from './annotatons.reducer';


export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  annotationsReducer: fromAnnotation.AnnotationSetState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  annotationsReducer: fromAnnotation.reducer
};

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}


export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');

export const getAnnoSetState = createFeatureSelector<AnnotationSetState>('annotationsReducer');


export const getRouterUrl = createSelector(
  getRouterState,
  state => state.state.url
);

export const getAppConfigState = createFeatureSelector<any>( 'appConfig' );

export * from './annotatons.reducer';