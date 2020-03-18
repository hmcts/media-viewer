import { ComponentRef, ElementRef, Injectable } from '@angular/core';
import { AnnotationSet } from '../../annotations/annotation-set/annotation-set.model';
import { ToolbarEventService } from '../../toolbar/toolbar-event.service';
import { ViewerEventService } from '../viewer-event.service';
import { BehaviorSubject } from 'rxjs';
import { AnnotationSetComponent } from '../../annotations/annotation-set/annotation-set.component';
import { PageEvent, PdfJsWrapper } from './pdf-js/pdf-js-wrapper';
import { CommentSetComponent } from '../../annotations/comment-set/comment-set.component';
import { AnnotationSetService } from './annotation-set.service';

@Injectable()
export class PdfAnnotationService {

  annotationSet: AnnotationSet;
  pdfWrapper: PdfJsWrapper;
  pdfViewer: ElementRef<HTMLDivElement>;
  highlightMode: BehaviorSubject<boolean>;
  drawMode: BehaviorSubject<boolean>;

  constructor(
    private readonly toolbarEvents: ToolbarEventService,
    private readonly viewerEvents: ViewerEventService,
    private readonly annotationSetService: AnnotationSetService
  ) {}

  init(pdfWrapper: PdfJsWrapper, pdfViewer: ElementRef): void {
    this.annotationSetService.init(pdfWrapper, pdfViewer);
    this.pdfWrapper = pdfWrapper;
  }

  // addAnnotations(pageRenderEvent: PageEvent): void {
  //   this.annotationSetService.addAnnotationsToPage(pageRenderEvent);
  // }

  addAnnoSetToPage() {
    this.annotationSetService.addAnnoSetToPage();
  }

  buildAnnoSetComponents(annotationSet: AnnotationSet): void {
    this.destroyComponents();
    this.setAnnotationSet(annotationSet);
    this.annotationSetService.buildAnnoSetComponents();
  }

  private setAnnotationSet(annotationSet: AnnotationSet): void {
    this.annotationSet = annotationSet;
    this.annotationSetService.setAnnotationSet(annotationSet);
  }

  destroyComponents() {
    this.annotationSetService.destroyComponents();
  }
}
