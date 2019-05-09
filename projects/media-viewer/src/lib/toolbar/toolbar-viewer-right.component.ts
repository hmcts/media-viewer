import { Component, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toolbar-viewer-right',
  template: `
    <div id="toolbarViewerRight">
      <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView"
              title="Switch to Presentation Mode" tabindex="31" data-l10n-id="presentation_mode">
        <span data-l10n-id="presentation_mode_label">Presentation Mode</span>
      </button>
      <button id="openFile" class="toolbarButton openFile hiddenLargeView" title="Open File" tabindex="32"
              data-l10n-id="open_file">
        <span data-l10n-id="open_file_label">Open</span>
      </button>
      <button id="print" class="toolbarButton print hiddenMediumView" title="Print" tabindex="33"
              data-l10n-id="print">
        <span data-l10n-id="print_label">Print</span>
      </button>
      <button id="download" class="toolbarButton download hiddenMediumView" title="Download" tabindex="34"
              data-l10n-id="download">
        <span data-l10n-id="download_label">Download</span>
      </button>
      <a href="#" id="viewBookmark" class="toolbarButton bookmark hiddenSmallView"
         title="Current view (copy or open in new window)" tabindex="35" data-l10n-id="bookmark">
        <span data-l10n-id="bookmark_label">Current View</span>
      </a>
      <div class="verticalToolbarSeparator hiddenSmallView"></div>
      <button id="secondaryToolbarToggle" class="toolbarButton" title="Tools" tabindex="36" data-l10n-id="tools"
              (click)="toggleSecondaryToolbar()">
        <span data-l10n-id="tools_label">Tools</span>
      </button>
    </div>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarViewerRightComponent {

  @Output() secondaryToolbarToggle = new BehaviorSubject(true);

  constructor() {}

  toggleSecondaryToolbar() {
    this.secondaryToolbarToggle.next(false);
  }

}
