import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PdfJsWrapper } from './pdf-js/pdf-js-wrapper';
import { BehaviorSubject, Subject } from 'rxjs';
import { PrintService } from '../../print.service';
import {
  ChangePageByDeltaOperation,
  DocumentLoadProgress,
  DownloadOperation,
  PrintOperation,
  RotateOperation,
  SearchOperation,
  SearchResultsCount,
  SetCurrentPageOperation,
  StepZoomOperation,
  ZoomOperation,
  ZoomValue,
  ToggleHighlightModeOperation
} from '../../events/viewer-operations';
import { PdfJsWrapperFactory } from './pdf-js/pdf-js-wrapper.provider';
import { AnnotationComponent } from '../../annotations/annotation.component';
import { AnnotationsViewInjector } from './annotations-view.injector';
import { AnnotationSet } from '../../annotations/annotation-set.model';

@Component({
  selector: 'mv-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements AfterContentInit, OnChanges {

  @Input() url: string;
  @Input() downloadFileName: string;
  @Input() searchResults: Subject<SearchResultsCount>;
  @Input() zoomValue: BehaviorSubject<ZoomValue>;
  @Input() currentPageChanged: Subject<SetCurrentPageOperation>;
  @Input() showAnnotations: boolean;
  @Input() annotationSet: AnnotationSet;

  annotationsViewInjector: AnnotationsViewInjector;

  loadingDocument = false;
  loadingDocumentProgress: number;
  errorMessage: string;

  @ViewChild('viewerContainer') viewerContainer: ElementRef;
  @ViewChild('pdfViewer') pdfViewer: ElementRef;

  private pdfWrapper: PdfJsWrapper;
  private highlightMode = false; // JJJ Setting a default value

  constructor(
    private readonly pdfJsWrapperFactory: PdfJsWrapperFactory,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private readonly printService: PrintService,
  ) {}

  async ngAfterContentInit(): Promise<void> {
    this.pdfWrapper = this.pdfJsWrapperFactory.create(this.viewerContainer);
    this.pdfWrapper.currentPageChanged.subscribe(v => this.currentPageChanged.next(v));
    this.pdfWrapper.searchResults.subscribe(v => this.searchResults.next(v));
    this.pdfWrapper.documentLoadInit.subscribe(() => this.onDocumentLoadInit());
    this.pdfWrapper.documentLoadProgress.subscribe(v => this.onDocumentLoadProgress(v));
    this.pdfWrapper.documentLoaded.subscribe(() => this.onDocumentLoaded());
    this.pdfWrapper.documentLoadFailed.subscribe(() => this.onDocumentLoadFailed());
    this.pdfWrapper.pagesRendered.subscribe(() => this.toggleAnnotations());

    await this.pdfWrapper.loadDocument(this.url);
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.url && this.pdfWrapper) {
      await this.pdfWrapper.loadDocument(this.url);
    }
    if (changes.showAnnotations) {
      this.toggleAnnotations();
    }
  }

  toggleAnnotations() {
    if (this.showAnnotations) {
      if (!this.annotationsViewInjector) {
        const annotationFactory = this.componentFactoryResolver
          .resolveComponentFactory(AnnotationComponent);
        this.annotationsViewInjector = new AnnotationsViewInjector(annotationFactory, this.viewContainerRef)
      }
      this.annotationsViewInjector.addToDom(this.annotationSet.annotations, this.zoomValue, this.pdfViewer);
    }
  }

  private onDocumentLoadInit() {
    this.loadingDocument = true;
    this.loadingDocumentProgress = null;
    this.errorMessage = null;
  }

  private onDocumentLoadProgress(documentLoadProgress: DocumentLoadProgress) {
    if (documentLoadProgress.total) {
      this.loadingDocumentProgress = Math.min(100, Math.ceil(documentLoadProgress.loaded / documentLoadProgress.total * 100 ));
    }
  }

  private onDocumentLoaded() {
    this.loadingDocument = false;
    if (this.showAnnotations) {
      this.toggleAnnotations();
    }
  }

  private onDocumentLoadFailed() {
    this.loadingDocument = false;
    this.errorMessage = `Could not load the document "${this.url}"`;
  }

  @Input()
  set rotateOperation(operation: RotateOperation | null) {
    if (operation) {
      this.pdfWrapper.rotate(operation.rotation);
    }
  }

  @Input()
  set zoomOperation(operation: ZoomOperation | null) {
    if (operation) {
      this.zoomValue.next({
        value: this.pdfWrapper.setZoom(operation.zoomFactor)
      });
    }
  }

  @Input()
  set stepZoomOperation(operation: StepZoomOperation | null) {
    if (operation) {
      this.zoomValue.next({
        value: this.pdfWrapper.stepZoom(operation.zoomFactor)
      });
    }
  }

  @Input()
  set searchOperation(operation: SearchOperation | null) {
    if (operation) {
      this.pdfWrapper.search(operation);
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
      this.pdfWrapper.downloadFile(this.url, this.downloadFileName);
    }
  }

  @Input()
  set setCurrentPage(operation: SetCurrentPageOperation | null) {
    if (operation) {
      this.pdfWrapper.setPageNumber(operation.pageNumber);
    }
  }

  @Input()
  set changePageByDelta(operation: ChangePageByDeltaOperation | null) {
    if (operation) {
      this.pdfWrapper.changePageNumber(operation.delta);
    }
  }

  @Input()
  set toggleHighlightMode(operation: ToggleHighlightModeOperation | null) {
    if (operation) {
      this.highlightMode = operation.highlightMode;
    }
  }

  @Input()
  set searchBarHidden(hidden: boolean) {
    if (this.pdfWrapper && hidden) {
      this.pdfWrapper.clearSearch();
    }
  }

  mouseDown(event: MouseEvent) {
    if (this.highlightMode) {
      console.log('mouseDown - ', event);
    }
  }

  mouseUp(event: MouseEvent) {
    if (this.highlightMode) {
      console.log('mouseUp - ', event);
    }
  }

}
