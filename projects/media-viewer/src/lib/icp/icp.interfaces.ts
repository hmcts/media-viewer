import { PdfPosition } from '../viewers/pdf-viewer/side-bar/bookmarks/bookmarks.interfaces';

export interface IcpState {
  session: IcpSession;
  presenter: IcpParticipant;
  client: IcpParticipant;
  pointer: boolean;
}

export interface IcpSession {
  sessionId: string;
  caseId: string;
  dateOfHearing: Date;
}

export interface IcpParticipant {
  id: string;
  username: string;
}

export interface IcpScreenUpdate {
  pdfPosition: PdfPosition;
  document: string;
  showPointer: boolean;
  pointerClick: IcpPointerClick;
}

export interface IcpPointerPosition {
  x: number;
  y: number;
}

export interface IcpPointerClick {
  page: number;
  position: IcpPointerPosition;
  target: any;
}
