import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { IcpPointerPosition, IcpState, IcpPointerClick } from './icp.interfaces';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store/reducers/reducers';
import { Subscription } from 'rxjs';
import * as fromIcpSelectors from '../store/selectors/icp.selectors';
import * as fromDocument from '../store/selectors/document.selectors';
import { ViewerEventService } from '../viewers/viewer-event.service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'mv-pointer',
  templateUrl: './icp-pointer.component.html'
})
export class IcpPointerComponent implements OnInit, OnDestroy, OnChanges{

  @Input() zoom: number;
  @Input() rotate: number;
  @Input() pointerClick: IcpPointerClick;

  isPresenter: boolean;
  width: number;
  height: number;
  page: number;
  allPages: object;
  pointerPosition: IcpPointerPosition;

  private subscriptions: Subscription[] = [];

  constructor(private el: ElementRef, private store: Store<fromStore.AnnotationSetState | IcpState>) {
    this.store.select(fromDocument.getPages)
      .subscribe(pages => {
        if (pages[1]) {
          this.allPages = pages;
        }
      });
  }

  ngOnInit() {
    this.subscriptions = [
      this.store.pipe(select(fromIcpSelectors.isPresenter))
        .subscribe(isPresenter => this.isPresenter = isPresenter)
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pointerClick) {
      const click = changes.pointerClick.currentValue;
      this.onClick(click);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onClick(click: IcpPointerClick) {
    if (!this.isPresenter) {
      this.page = click.page;
      this.pointerPosition = this.convertCoordinates(click.target, click.position);
    }
  }

  convertCoordinates(target: any, position: IcpPointerPosition): IcpPointerPosition {
    const top = (position.y - target.top)/this.zoom;
    const left = (position.x - target.left)/this.zoom;
    const newPosition: IcpPointerPosition = { x: 0, y: 0 };

    this.height = this.allPages[this.page].styles.height;
    this.width = this.allPages[this.page].styles.width;

    switch (this.rotate) {
      case 90:
        newPosition.x = top;
        newPosition.y = (this.width/this.zoom) - left;
        break;
      case 180:
        newPosition.x = (this.width/this.zoom) - left;
        newPosition.y = (this.height/this.zoom) - top;
        break;
      case 270:
        newPosition.x = (this.height/this.zoom) - top;
        newPosition.y = left;
        break;
      default:
        newPosition.x = left;
        newPosition.y = top;
    }

    return newPosition;
  }
}
