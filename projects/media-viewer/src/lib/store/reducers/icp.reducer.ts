import * as fromIcpActions from '../actions/icp.action';

export interface IcpSessionState {
  session: IcpSession;
  connected: boolean;
}

export interface IcpSession {
  id: string;
  description: string;
  dateOfHearing: Date;
  documents: string[];
  participants: string[];
}

export const initialIcpSessionState: IcpSessionState = {
  session: null,
  connected: false
};

export function icpReducer (state = initialIcpSessionState,
                                  action: fromIcpActions.IcpActions): IcpSessionState {

  switch (action.type) {

    case fromIcpActions.CREATE_ICP_SESSION_SUCCESS: {
      const session: IcpSession = action.payload;
      return {
        ...state,
        session,
        connected: true
      }
    }
  }

  return state;
}
