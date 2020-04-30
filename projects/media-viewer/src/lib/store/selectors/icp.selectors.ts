import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromIcp from '../reducers/icp.reducer';

export const getIcpSessionState = createSelector(
  fromFeature.getMVState,
  (state: fromFeature.State) =>  state.icpSession
);

export const getIcpSession = createSelector(
  getIcpSessionState,
  fromIcp.getIcpSession
);
