import * as fromIcpActions from '../actions/icp.action';

export interface IcpSessionState {
  session: IcpSession;
  connected: boolean;
  presenting: boolean;
}

export interface IcpSession {
  id: string;
  description: string;
  dateOfHearing: Date;
  documents: string[];
  participants: string[];
}

export interface Screen {
  page: number;
  document: string;
}

export const initialIcpSessionState: IcpSessionState = {
  session: null,
  connected: false,
  presenting: false
};

export function icpReducer (state = initialIcpSessionState,
                                  action: fromIcpActions.IcpActions): IcpSessionState {

  switch (action.type) {

    case fromIcpActions.CREATE_ICP_SESSION_SUCCESS: {
      const session: IcpSession = action.payload;
      const connected = true;
      const presenting = true;
      return {
        ...state,
        session,
        connected,
        presenting
      }
    }

    case fromIcpActions.LOAD_ICP_SESSION_SUCCESS: {
      const session: IcpSession = action.payload;
      const connected = true;
      return {
        ... state,
        connected,
        session
      }
    }
  }

  return state;
}

export const getIcpSession = (state: IcpSessionState) => state.session;

