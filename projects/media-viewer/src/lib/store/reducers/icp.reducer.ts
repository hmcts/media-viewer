import * as fromIcpActions from '../actions/icp.action';

export interface IcpState {
  session: IcpSession;
  screenUpdate: IcpScreenUpdate;
  presenting: boolean;
}

export interface IcpSession {
  id: string;
  description: string;
  dateOfHearing: Date;
  documents: string[];
  participants: string[];
}

export interface IcpScreenUpdate {
  page: number;
  document: string;
}

export const initialIcpSessionState: IcpState = {
  session: null,
  screenUpdate: null,
  presenting: false,
};

export function icpReducer (state = initialIcpSessionState,
                                  action: fromIcpActions.IcpActions): IcpState {

  switch (action.type) {

    case fromIcpActions.CREATE_ICP_SESSION_SUCCESS: {
      const session: IcpSession = action.payload;
      return {
        ...state,
        session,
        presenting: true
      }
    }

    case fromIcpActions.LOAD_ICP_SESSION_SUCCESS: {
      const session: IcpSession = action.payload;
      return {
        ...state,
        session
      }
    }

    case fromIcpActions.ICP_SCREEN_UPDATED_SUCCESS: {
      const screenUpdate: IcpScreenUpdate = action.payload;
      return {
        ...state,
        screenUpdate
      }
    }
  }
  return state;
}

export const getIcpSession = (state: IcpState) => state.session;
export const getIpcPresenting = (state: IcpState) => state.presenting;
export const getIcpScreenUpdate = (state: IcpState) => state.screenUpdate;

