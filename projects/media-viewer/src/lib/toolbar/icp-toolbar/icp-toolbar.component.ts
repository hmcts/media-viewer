import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarEventService } from '../toolbar-event.service';
import { select, Store } from '@ngrx/store';
import * as fromIcpSelectors from '../../store/selectors/icp.selectors';
import { Subscription } from 'rxjs';
import { IcpState } from '../../icp/icp.interfaces';
import * as fromIcpActions from '../../store/actions/icp.action';

@Component({
  selector: 'mv-icp-toolbar',
  templateUrl: './icp-toolbar.component.html'
})
export class IcpToolbarComponent implements OnInit, OnDestroy {

  presenterName: string;
  isPresenter: boolean;
  showPointer: boolean;

  private $subscription: Subscription;

  constructor(public readonly toolbarEventService: ToolbarEventService,
              private store: Store<IcpState>) {}

  ngOnInit() {
    this.$subscription = this.store.pipe(select(fromIcpSelectors.isPresenter))
      .subscribe(isPresenter => this.isPresenter = isPresenter);
    this.$subscription.add(this.store.pipe(select(fromIcpSelectors.getPresenterName))
      .subscribe(name => this.presenterName = name));
    this.$subscription = this.store.pipe(select(fromIcpSelectors.showPointer))
      .subscribe(showPointer => this.showPointer = showPointer);
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  present() {
    this.toolbarEventService.icp.becomePresenter();
    this.toolbarEventService.icp.togglePointer(true);
  }

  stopPresenting() {
    this.toolbarEventService.icp.stopPresenting();
    this.toolbarEventService.icp.togglePointer(false);
  }

  leaveIcpSession() {
    this.toolbarEventService.icp.leaveSession();
  }

  togglePointer() {
    this.toolbarEventService.icp.togglePointer(!this.showPointer);
  }
}
