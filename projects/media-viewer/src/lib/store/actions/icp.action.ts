import { Action } from '@ngrx/store';
import { IcpSession } from '../reducers/icp.reducer';

export const CREATE_ICP_SESSION = '[Icp] Create Session';
export const CREATE_ICP_SESSION_SUCCESS = '[Icp] Create Session Success';
export const CREATE_ICP_SESSION_FAIL = '[Icp] Create Session Fail';

export class CreateIcpSession implements Action {
  readonly type = CREATE_ICP_SESSION;
  constructor(public payload: IcpSession) {}
}

export class CreateIcpSessionSuccess implements Action {
  readonly type = CREATE_ICP_SESSION_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateIcpSessionFailure implements Action {
  readonly type = CREATE_ICP_SESSION_FAIL;
  constructor(public payload: Error) {}
}

export type IcpActions =
  | CreateIcpSession
  | CreateIcpSessionSuccess
  | CreateIcpSessionFailure;
