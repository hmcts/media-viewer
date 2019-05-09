import { Component, Input } from '@angular/core';
import { ActionEvents, RotateOperation } from '../media-viewer/media-viewer.model';

@Component({
  selector: 'app-secondary-toolbar',
  template: `
    <div id="secondaryToolbar" class="secondaryToolbar doorHangerRight" [ngClass]="{ hidden: !secondaryToolbarToggle }">
      <div id="secondaryToolbarButtonContainer">
        <button id="secondaryPresentationMode" class="secondaryToolbarButton presentationMode visibleLargeView"
                title="Switch to Presentation Mode" tabindex="51" data-l10n-id="presentation_mode">
          <span data-l10n-id="presentation_mode_label">Presentation Mode</span>
        </button>
        <button id="secondaryOpenFile" class="secondaryToolbarButton openFile visibleLargeView" title="Open File"
                tabindex="52" data-l10n-id="open_file">
          <span data-l10n-id="open_file_label">Open</span>
        </button>
        <button id="secondaryPrint" class="secondaryToolbarButton print visibleMediumView" title="Print" tabindex="53"
                data-l10n-id="print">
          <span data-l10n-id="print_label">Print</span>
        </button>
        <button id="secondaryDownload" class="secondaryToolbarButton download visibleMediumView" title="Download"
                tabindex="54" data-l10n-id="download">
          <span data-l10n-id="download_label">Download</span>
        </button>
        <a href="#" id="secondaryViewBookmark" class="secondaryToolbarButton bookmark visibleSmallView"
           title="Current view (copy or open in new window)" tabindex="55" data-l10n-id="bookmark">
          <span data-l10n-id="bookmark_label">Current View</span>
        </a>
        <div class="horizontalToolbarSeparator visibleLargeView"></div>
        <button id="firstPage" class="secondaryToolbarButton firstPage" title="Go to First Page" tabindex="56"
                data-l10n-id="first_page">
          <span data-l10n-id="first_page_label">Go to First Page</span>
        </button>
        <button id="lastPage" class="secondaryToolbarButton lastPage" title="Go to Last Page" tabindex="57"
                data-l10n-id="last_page">
          <span data-l10n-id="last_page_label">Go to Last Page</span>
        </button>
        <div class="horizontalToolbarSeparator"></div>
        <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="Rotate Clockwise" tabindex="58"
                data-l10n-id="page_rotate_cw" (click)="rotate(90)">
          <span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span>
        </button>
        <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="Rotate Counterclockwise"
                tabindex="59" data-l10n-id="page_rotate_ccw" (click)="rotate(-90)">
          <span data-l10n-id="page_rotate_ccw_label">Rotate Counterclockwise</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class SecondaryToolbarComponent {

  @Input() secondaryToolbarToggle;
  @Input() actionEvents: ActionEvents;

  constructor() {}

  rotate(rotation: number) {
    this.actionEvents.rotate.next(new RotateOperation(rotation));
  }
}
