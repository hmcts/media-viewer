import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PdfJsWrapper } from './pdf-js/pdf-js-wrapper';
import { Subject } from 'rxjs';
import { PrintService } from '../../service/print.service';
import {
  ChangePageByDeltaOperation,
  DownloadOperation,
  PrintOperation,
  RotateOperation,
  SearchOperation,
  SearchResultsCount,
  SetCurrentPageOperation,
  StepZoomOperation,
  ZoomOperation,
  ZoomValue
} from '../../model/viewer-operations';
import { ToolbarToggles } from '../../model/toolbar-toggles';
import { PdfJsWrapperFactory } from './pdf-js/pdf-js-wrapper.provider';
import { multicast } from 'rxjs/operators';

@Component({
  selector: 'mv-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements AfterViewInit {

  @Input() url: string;
  @Input() downloadFileName: string;
  @Input() searchResults: Subject<SearchResultsCount>;
  @Input() zoomValue: Subject<ZoomValue>;
  @Input() currentPageChanged: Subject<SetCurrentPageOperation>;

  @ViewChild('viewerContainer') viewerContainer: ElementRef;

  private pdfViewer: PdfJsWrapper;

  constructor(
    private readonly pdfJsWrapperFactory: PdfJsWrapperFactory,
    private readonly printService: PrintService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.pdfViewer = this.pdfJsWrapperFactory.create(this.viewerContainer);
    this.pdfViewer.currentPageChanged.subscribe(v => this.currentPageChanged.next(v));
    this.pdfViewer.searchResults.subscribe(v => this.searchResults.next(v));

    await this.pdfViewer.loadDocument(this.url);
  }


  @Input()
  set rotateOperation(operation: RotateOperation | null) {
    if (operation) {
      this.pdfViewer.rotate(operation.rotation);
    }
  }

  @Input()
  set zoomOperation(operation: ZoomOperation | null) {
    if (operation) {
      this.zoomValue.next({
        value: this.pdfViewer.setZoom(operation.zoomFactor)
      });
    }
  }

  @Input()
  set stepZoomOperation(operation: StepZoomOperation | null) {
    if (operation) {
      this.zoomValue.next({
        value: this.pdfViewer.stepZoom(operation.zoomFactor)
      });
    }
  }

  @Input()
  set searchOperation(operation: SearchOperation | null) {
    if (operation) {
      this.pdfViewer.search(operation);
    }
  }

  @Input()
  set printOperation(operation: PrintOperation | null) {
    if (operation) {
      this.printService.printDocumentNatively(this.url);
    }
  }

  @Input()
  set downloadOperation(operation: DownloadOperation | null) {
    if (operation) {
      this.pdfViewer.downloadFile(this.url, this.downloadFileName);
    }
  }

  @Input()
  set setCurrentPage(operation: SetCurrentPageOperation | null) {
    if (operation) {
      this.pdfViewer.setPageNumber(operation.pageNumber);
    }
  }

  @Input()
  set changePageByDelta(operation: ChangePageByDeltaOperation | null) {
    if (operation) {
      this.pdfViewer.incrementPageNumber(operation.delta);
    }
  }

  @Input()
  set toolbarToggles(toolbarToggles: ToolbarToggles | null) {
    if (toolbarToggles) {
      toolbarToggles.showSearchbarToggleBtn.next(true);
      toolbarToggles.showZoomBtns.next(true);
      toolbarToggles.showRotateBtns.next(true);
      toolbarToggles.showNavigationBtns.next(true);
      toolbarToggles.showDownloadBtn.next(true);
      toolbarToggles.showPrintBtn.next(true);
    }
  }
}
