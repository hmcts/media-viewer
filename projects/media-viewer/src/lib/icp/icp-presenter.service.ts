import { Injectable } from '@angular/core';
import { ToolbarEventService } from '../toolbar/toolbar-event.service';
import { select, Store } from '@ngrx/store';
import * as fromDocSelectors from '../store/selectors/document.selectors';
import { Subscription } from 'rxjs';
import { PdfPosition } from '../viewers/pdf-viewer/side-bar/bookmarks/bookmarks.interfaces';
import { IcpUpdateService } from './icp-update.service';
import {
  IcpState,
  IcpScreenUpdate,
  IcpSession,
  IcpParticipant,
  IcpPointerClick
} from './icp.interfaces';
import * as fromIcpSelectors from '../store/selectors/icp.selectors';
import * as fromIcpActions from '../store/actions/icp.action';
import { ViewerEventService } from '../viewers/viewer-event.service';

@Injectable()
export class IcpPresenterService {

  session: IcpSession;
  presenter: IcpParticipant;
  pdfPosition: PdfPosition;
  showPointer: boolean;
  pointerClick: IcpPointerClick;

  $subscription: Subscription;

  constructor(private readonly toolbarEvents: ToolbarEventService,
              private readonly viewerEventService: ViewerEventService,
              private readonly socketService: IcpUpdateService,
              private store: Store<IcpState>) {}


  update(isPresenter: boolean) {
    if (isPresenter) {
      this.subscribe();
    } else {
      this.unsubscribe();
    }
  }

  subscribe() {
    if (!this.$subscription) {
      this.$subscription = this.store.pipe(select(fromDocSelectors.getPdfPosition)).subscribe(pdfPosition => {
          this.pdfPosition = pdfPosition;
          this.onPositionUpdate(pdfPosition);
        });
      this.$subscription.add(this.store.pipe(select(fromIcpSelectors.getPresenter)).subscribe(presenter => {
        this.presenter = presenter;
      }));
      this.$subscription.add(this.socketService.newParticipantJoined().subscribe(() => {
        this.onNewParticipantJoined();
      }));
      this.$subscription.add(this.toolbarEvents.icp.togglePointerSubject.subscribe((toggle) => {
        this.store.dispatch(new fromIcpActions.IcpPointerToggled(toggle));
      }));
      this.$subscription.add(this.store.pipe(select(fromIcpSelectors.showPointer)).subscribe(showPointer => {
        this.showPointer = showPointer;
        this.onTogglePointer(showPointer)
      }));
      this.$subscription.add(this.viewerEventService.pointerClick.subscribe((click) => {
        this.pointerClick = click;
        this.onPointerClick(click);
      }));
    }
  }

  unsubscribe() {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
      this.$subscription = undefined;
    }
  }

  onPositionUpdate(pdfPosition: PdfPosition) {
    const screen: IcpScreenUpdate = {
      pdfPosition,
      document: undefined,
      showPointer: this.showPointer,
      pointerClick: this.pointerClick
    };
    this.socketService.updateScreen(screen);
  }

  onTogglePointer(showPointer: boolean) {
    const screen: IcpScreenUpdate = {
      pdfPosition: this.pdfPosition,
      document: undefined,
      showPointer,
      pointerClick: this.pointerClick
    };
    this.socketService.updateScreen(screen);
  }

  onPointerClick(pointerClick: IcpPointerClick) {
    const screen: IcpScreenUpdate = {
      pdfPosition: this.pdfPosition,
      document: undefined,
      showPointer: this.showPointer,
      pointerClick
    };
    this.socketService.updateScreen(screen);
  }

  onNewParticipantJoined() {
    this.onPositionUpdate(this.pdfPosition);
    this.socketService.updatePresenter(this.presenter);
  }
}
