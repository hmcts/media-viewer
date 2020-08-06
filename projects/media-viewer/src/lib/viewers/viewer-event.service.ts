import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {AnnotationSet} from '../annotations/annotation-set/annotation-set.model';
import { IcpPointerClick } from '../icp/icp.interfaces';

export interface Highlight {
  page: number;
  event: MouseEvent;
  annoSet: AnnotationSet;
}

@Injectable({ providedIn: 'root' })
export class ViewerEventService {

  public readonly textHighlight = new Subject<Highlight>();
  public readonly boxHighlight = new Subject<Highlight>();
  public readonly ctxToolbarCleared = new Subject();
  public readonly navigationEvent = new Subject<any[]>();
  public readonly pointerClick = new Subject<IcpPointerClick>();
  public readonly pointerUpdate = new Subject<IcpPointerClick>();

  constructor() {}

  public textSelected(selectionData: Highlight): void {
    this.textHighlight.next(selectionData);
  }

  public boxSelected(selectionData: Highlight): void {
    this.boxHighlight.next(selectionData);
  }

  public clearCtxToolbar(): void {
    this.ctxToolbarCleared.next();
  }

  public goToDestination(destination: any[]) {
    this.navigationEvent.next(destination);
  }

  public pointerClicked(click: IcpPointerClick) {
    this.pointerClick.next(click);
  }

  public updatePointer(click: IcpPointerClick) {
    this.pointerUpdate.next(click);
  }
}
