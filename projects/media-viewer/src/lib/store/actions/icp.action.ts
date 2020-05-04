import { Action } from '@ngrx/store';
import { IcpSession, Screen } from '../reducers/icp.reducer';

export const CREATE_ICP_SESSION = '[Icp] Create Session';
export const CREATE_ICP_SESSION_SUCCESS = '[Icp] Create Session Success';
export const CREATE_ICP_SESSION_FAIL = '[Icp] Create Session Fail';
export const LOAD_ICP_SESSION = '[Icp] Load Session';
export const LOAD_ICP_SESSION_SUCCESS = '[Icp] Load Session Success';
export const LOAD_ICP_SESSION_FAIL = '[Icp] Load Session Failure';

export const UPDATE_ICP_SCREEN = '[Icp] Update Screen';
export const ICP_SCREEN_UPDATED = '[Icp] Screen Updated';
export const ICP_SCREEN_UPDATED_SUCCESS = '[Icp] Screen Updated Success';
export const ICP_SCREEN_UPDATED_FAIL = '[Icp] Screen Updated Failure';

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

export class LoadIcpSession implements Action {
  readonly type = LOAD_ICP_SESSION;
  constructor(public payload: string) {}
}

export class LoadIcpSessionSuccess implements Action {
  readonly type = LOAD_ICP_SESSION_SUCCESS;
  constructor(public payload: IcpSession) {}
}

export class LoadIcpSessionFailure implements Action {
  readonly type = LOAD_ICP_SESSION_FAIL;
  constructor(public payload: Error) {}
}

export class UpdateIcpScreen implements Action {
  readonly type = UPDATE_ICP_SCREEN;
  constructor(public payload: { body: Screen, id: string }) {}
}

export class IcpScreenUpdated implements Action {
  readonly type = ICP_SCREEN_UPDATED;
  constructor(public payload: string) {}
}

export class IcpScreenUpdatedSuccess implements Action {
  readonly type = ICP_SCREEN_UPDATED_SUCCESS;
  constructor(public payload: Screen) {}
}

export class IcpScreenUpdatedFailure implements Action {
  readonly type = ICP_SCREEN_UPDATED_FAIL;
  constructor(public payload: Error) {}
}

export type IcpActions =
  | CreateIcpSession
  | CreateIcpSessionSuccess
  | CreateIcpSessionFailure
  | LoadIcpSession
  | LoadIcpSessionSuccess
  | LoadIcpSessionFailure
  | UpdateIcpScreen
  | IcpScreenUpdated
  | IcpScreenUpdatedSuccess;
