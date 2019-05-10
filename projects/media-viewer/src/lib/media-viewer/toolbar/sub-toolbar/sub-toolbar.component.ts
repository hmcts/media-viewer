import { Component, Input } from '@angular/core';
import { ActionEvents, GenericOperation, RotateOperation } from '../../media-viewer.model';

@Component({
  selector: 'mv-sub-toolbar',
  templateUrl: './sub-toolbar.component.html',
  styleUrls: ['../styles/toolbar.component.scss']
})
export class SubToolbarComponent {

  @Input() subToolbarToggle;
  @Input() actionEvents: ActionEvents;

  constructor() {}

  rotate(rotation: number) {
    this.actionEvents.rotate.next(new RotateOperation(rotation));
  }

  printFile() {
    this.actionEvents.print.next(new GenericOperation('print'));
  }

  downloadFile() {
    this.actionEvents.download.next(new GenericOperation('download'));
  }
}
