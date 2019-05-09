import { Component, Input } from '@angular/core';
import { ActionEvents, ZoomOperation } from '../media-viewer/media-viewer.model';

@Component({
  selector: 'app-toolbar-viewer-middle',
  template: `
    <div id="toolbarViewerMiddle">
      <div class="splitToolbarButton">
        <button id="zoomOut" class="toolbarButton zoomOut" title="Zoom Out" tabindex="21" data-l10n-id="zoom_out"
                (click)="zoom(-0.2)">
          <span data-l10n-id="zoom_out_label">Zoom Out</span>
        </button>
        <div class="splitToolbarButtonSeparator"></div>
        <button id="zoomIn" class="toolbarButton zoomIn" title="Zoom In" tabindex="22" data-l10n-id="zoom_in"
                (click)="zoom(0.2)">
          <span data-l10n-id="zoom_in_label">Zoom In</span>
        </button>
      </div>
      <span id="scaleSelectContainer" class="dropdownToolbarButton">
            <select id="scaleSelect" title="Zoom" tabindex="23" data-l10n-id="zoom">
              <option id="pageAutoOption" title="" value="auto" selected="selected" data-l10n-id="page_scale_auto">Automatic Zoom</option>
              <option id="pageActualOption" title="" value="page-actual"
                      data-l10n-id="page_scale_actual">Actual Size</option>
              <option id="pageFitOption" title="" value="page-fit" data-l10n-id="page_scale_fit">Page Fit</option>
              <option id="pageWidthOption" title="" value="page-width"
                      data-l10n-id="page_scale_width">Page Width</option>
              <option id="customScaleOption" title="" value="custom" disabled="disabled" hidden="true"></option>
              <option title="" value="0.5" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 50 }'>50%</option>
              <option title="" value="0.75" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 75 }'>75%</option>
              <option title="" value="1" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 100 }'>100%</option>
              <option title="" value="1.25" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 125 }'>125%</option>
              <option title="" value="1.5" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 150 }'>150%</option>
              <option title="" value="2" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 200 }'>200%</option>
              <option title="" value="3" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 300 }'>300%</option>
              <option title="" value="4" data-l10n-id="page_scale_percent"
                      data-l10n-args='{ "scale": 400 }'>400%</option>
            </select>
          </span>
    </div>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarViewerMiddleComponent {

  @Input() actionEvents: ActionEvents;

  constructor() {}

  zoom(zoomFactor: number) {
    this.actionEvents.zoom.next(new ZoomOperation(zoomFactor));
  }
}
