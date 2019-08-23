import { ElementRef, Injectable } from '@angular/core';
import { DocumentLoadProgress, PdfJsWrapper } from './pdf-js-wrapper';
import { Subject } from 'rxjs';
import { ToolbarEventService } from '../../../toolbar/toolbar-event.service';

@Injectable({providedIn: 'root'})
export class PdfJsWrapperFactory {

  constructor(
    private readonly toolbarEvents: ToolbarEventService
  ) {}

  async create(container: ElementRef): Promise<PdfJsWrapper> {
    return import('pdfjs-dist/web/pdf_viewer').then(pdfjsViewer => {
      const pdfLinkService = new pdfjsViewer.PDFLinkService();
      const eventBus = new pdfjsViewer.EventBus();
      const pdfFindController = new pdfjsViewer.PDFFindController({
        linkService: pdfLinkService,
        eventBus: eventBus
      });
  
      const pdfViewer = new pdfjsViewer.PDFViewer({
        container: container.nativeElement,
        linkService: pdfLinkService,
        findController: pdfFindController,
        eventBus: eventBus,
        imageResourcesPath: '/assets/images/'
      });
  
      pdfLinkService.setViewer(pdfViewer);
  
      return new PdfJsWrapper(
        pdfViewer,
        new pdfjsViewer.DownloadManager({}),
        this.toolbarEvents,
        new Subject<string>(),
        new Subject<DocumentLoadProgress>(),
        new Subject<any>(),
        new Subject(),
        new Subject<{pageNumber: number, source: {rotation: number, scale: number, div: HTMLElement}}>()
      );
   });
  }

}
