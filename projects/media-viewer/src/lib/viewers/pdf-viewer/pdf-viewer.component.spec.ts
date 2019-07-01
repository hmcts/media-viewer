import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Subject } from 'rxjs';
import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfJsWrapperFactory } from './pdf-js/pdf-js-wrapper.provider';
import { annotationSet } from '../../../assets/annotation-set';
import { PrintService } from '../../print.service';
import {CUSTOM_ELEMENTS_SCHEMA, SimpleChange} from '@angular/core';
import {ErrorMessageComponent} from '../error-message/error.message.component';
import {By} from '@angular/platform-browser';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {AnnotationSetComponent} from '../../annotations/annotation-set/annotation-set.component';
import { AnnotationApiService } from '../../annotations/annotation-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToolbarEventService } from '../../toolbar/toolbar-event.service';
import { DocumentLoadProgress } from './pdf-js/pdf-js-wrapper';

describe('PdfViewerComponent', () => {
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;

  const mockWrapper = {
    loadDocument: () => {},
    search: () => {},
    clearSearch: () => {},
    rotate: () => {},
    setZoom: () => {},
    stepZoom: () => {},
    downloadFile: () => {},
    setPageNumber: () => {},
    changePageNumber: () => {},
    getNormalisedPagesRotation: () => 0,
    documentLoadInit: new Subject<string>(),
    documentLoadProgress: new Subject<DocumentLoadProgress>(),
    documentLoaded: new Subject<any>(),
    documentLoadFailed: new Subject(),
    pageRendered: new Subject<{pageNumber: number, source: {rotation: number, scale: number, div: Element}}>()
  };

  const mockFactory = {
    create: () => mockWrapper
  };

  const mockPrintService = {
    printDocumentNatively: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfViewerComponent, ErrorMessageComponent, AnnotationSetComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AnnotationApiService,
        ToolbarEventService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    })
      .overrideComponent(PdfViewerComponent, {
        set: {
          providers: [
            { provide: PdfJsWrapperFactory, useValue: mockFactory },
            { provide: PrintService, useFactory: () => mockPrintService },
            AnnotationApiService
          ]
        }
      })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [AnnotationSetComponent]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(PdfViewerComponent);
    component = fixture.componentInstance;

    await component.ngAfterContentInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the print operation', () => {
    spyOn(mockPrintService, 'printDocumentNatively');
    component.url = 'derp';
    component.toolbarEvents.print.next();
    expect(mockPrintService.printDocumentNatively).toHaveBeenCalledWith(component.url);
  });

  it('clear the search when the search bar is closed', () => {
    spyOn(mockWrapper, 'clearSearch');
    component.searchBarHidden = true;
    expect(mockWrapper.clearSearch).toHaveBeenCalled();
  });

  it('test loadDocument is called when URL changes', async () => {
    const loadDocumentSpy = spyOn(mockWrapper, 'loadDocument');
    await component.ngOnChanges({
      url: new SimpleChange('a', 'b', true)
    });
    await component.ngOnChanges({
      url: new SimpleChange('b', 'c', true)
    });
    expect(loadDocumentSpy).toHaveBeenCalledTimes(2);
  });

  it('on NewDocumentLoadInit indicate document is loading', () => {
    mockWrapper.documentLoadInit.next('abc');
    expect(component.loadingDocument).toBeTruthy();
  });

  it('on DocumentLoadProgress indicate document loading progress', () => {
    mockWrapper.documentLoadProgress.next({ loaded: 10, total: 100 });
    expect(component.loadingDocumentProgress).toBe(10);
    mockWrapper.documentLoadProgress.next({ loaded: 90, total: 100 });
    expect(component.loadingDocumentProgress).toBe(90);
    mockWrapper.documentLoadProgress.next({ loaded: 200, total: 100 });
    expect(component.loadingDocumentProgress).toBe(100);
  });

  it('when errorMessage available show error message', () => {
    expect(fixture.debugElement.query(By.css('.pdfContainer')).nativeElement.className).not.toContain('hidden');
    expect(fixture.debugElement.query(By.directive(ErrorMessageComponent))).toBeNull();
    component.errorMessage = 'errorx';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.pdfContainer')).nativeElement.className).toContain('hidden');
    expect(fixture.debugElement.query(By.directive(ErrorMessageComponent))).toBeTruthy();
  });

  it('on document load failed expect error message', () => {
    mockWrapper.documentLoadFailed.next();
    expect(component.errorMessage).toContain('Could not load the document');
    expect(component.loadingDocument).toBe(false);
  });

  it('on page rendered render annotation set if annotations enabled', () => {
    component.annotationSet = annotationSet;
    const div = document.createElement('div');
    mockWrapper.pageRendered.next({pageNumber: 1, source: {rotation: 0, scale: 1, div: div}});
    expect(div.childNodes).not.toBeNull();
    expect(div.childNodes.length).toBe(1);
  });
});
