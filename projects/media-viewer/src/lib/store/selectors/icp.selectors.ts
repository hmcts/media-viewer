import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromIcp from '../reducers/icp.reducer';

export const getIcpState = createSelector(
  fromFeature.getMVState,
  (state: fromFeature.State) =>  state.icp
);

export const getIcpSession = createSelector(
  getIcpState,
  fromIcp.getIcpSession
);

export const getIcpScreenUpdate = createSelector(
  getIcpState,
  fromIcp.getIcpScreenUpdate
)
