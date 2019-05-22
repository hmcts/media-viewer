import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PdfViewerComponent } from './pdf-viewer.component';
import { EmLoggerService } from '../../../logging/em-logger.service';
import { PdfJsWrapperFactory } from './pdf-js/pdf-js-wrapper.provider';

describe('PdfViewerComponent', () => {
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ PdfViewerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        EmLoggerService,
        PdfJsWrapperFactory
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
