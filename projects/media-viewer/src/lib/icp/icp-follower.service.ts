import { Injectable } from '@angular/core';
import { ToolbarEventService } from '../toolbar/toolbar-event.service';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IcpUpdateService } from './icp-update.service';
import { ViewerEventService } from '../viewers/viewer-event.service';
import { take } from 'rxjs/operators';
import { IcpState, IcpSession, IcpPointerPosition, IcpPointerClick } from './icp.interfaces';
import * as fromDocSelectors from '../store/selectors/document.selectors';
import { PdfPosition } from '../viewers/pdf-viewer/side-bar/bookmarks/bookmarks.interfaces';

@Injectable()
export class IcpFollowerService {

  session: IcpSession;
  pointerClick: IcpPointerClick;
  showPointer = false;

  $subscription: Subscription;

  constructor(private readonly toolbarEvents: ToolbarEventService,
              private readonly viewerEvents: ViewerEventService,
              private readonly socketService: IcpUpdateService,
              private store: Store<IcpState>) {}


  update(isFollower: boolean) {
    if (isFollower) {
      this.subscribe();
    } else {
      this.unsubscribe();
    }
  }

  subscribe() {
    if (!this.$subscription) {
      this.$subscription = this.socketService.screenUpdated()
        .subscribe(screen => this.followScreenUpdate(screen));
    }
  }

  unsubscribe() {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
      this.$subscription = undefined;
    }
  }

  followScreenUpdate({ pdfPosition, showPointer, pointerClick }) {
    this.updatePdfPosition(pdfPosition);
    this.togglePointer(showPointer)
    this.updatePointerClick(pointerClick);
  }

  updatePdfPosition(pdfPosition: PdfPosition) {
    if (pdfPosition) {
      this.viewerEvents.goToDestination([
        pdfPosition.pageNumber - 1,
        { 'name': 'XYZ' },
        pdfPosition.left,
        pdfPosition.top
      ]);
    }
    this.store.pipe(select(fromDocSelectors.getPdfPosition), take(1))
      .subscribe(position => {
        const rotationDelta =  (pdfPosition.rotation - position.rotation)%360;
        if (rotationDelta !== 0) {
          this.toolbarEvents.rotate(rotationDelta);
        }
      });
  }

  togglePointer(showPointer = false) {
    this.showPointer = showPointer;
  }

  updatePointerClick(click: IcpPointerClick) {
    this.pointerClick = click;

    if (this.showPointer) {
       this.viewerEvents.updatePointer(this.pointerClick);
    } else {
      this.viewerEvents.updatePointer(undefined);
    }
  }
}
