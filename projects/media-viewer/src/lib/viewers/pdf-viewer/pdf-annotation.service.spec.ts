import { inject, TestBed } from '@angular/core/testing';
import { PdfAnnotationService } from './pdf-annotation-service';
import { annotationSet } from '../../../assets/annotation-set';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ToolbarEventService } from '../../toolbar/toolbar-event.service';
import { ViewerEventService } from '../viewer-event.service';

describe('PdfAnnotationService', () => {
  let service: PdfAnnotationService;
  let factory: ComponentFactoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PdfAnnotationService,
        ViewContainerRef,
        ToolbarEventService,
        ViewerEventService,
        ComponentFactoryResolver
      ]
    });

    service = TestBed.get(PdfAnnotationService);
    factory = TestBed.get(ComponentFactoryResolver);
  });

  it('should be created', inject([PdfAnnotationService], (service: PdfAnnotationService) => {
    expect(service).toBeTruthy();
  }));

  it('should store annotationSet components for the pages annotations exist when loaded', () => {
    spyOn(service, 'onPageRendered');

    service.setupAnnotationSet({ ...annotationSet });

    expect(service.pages.length).toEqual(2);
    expect(service.annotationSetComponents.length).toEqual(2);
  });

  it('should initialise the annotationSet components', async () => {
    const divElement = document.createElement('div');
    const pageRenderEvent = { pageNumber: 1, source: { rotation: 0, scale: 1, div: divElement } };

    await service.onPageRendered(pageRenderEvent);

    expect(service.annotationSetComponents[0].instance.initialise).toHaveBeenCalledWith(pageRenderEvent.source);
  });
});