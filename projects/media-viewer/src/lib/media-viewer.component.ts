import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  defaultImageOptions,
  defaultPdfOptions,
  defaultUnsupportedOptions,
  ToolbarButtonVisibilityService
} from './toolbar/toolbar-button-visibility.service';
import { AnnotationSet } from './annotations/annotation-set/annotation-set.model';
import { ToolbarEventService } from './toolbar/toolbar-event.service';
import { AnnotationApiService } from './annotations/annotation-api.service';
import { ResponseType, ViewerException } from './viewers/error-message/viewer-exception.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mv-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['styles/main.scss', './media-viewer.component.scss']
})
export class MediaViewerComponent implements OnChanges, AfterContentInit {

  @Input() url;
  @Input() downloadFileName: string;
  @Input() contentType: string;

  @Input() showToolbar = true;
  @Input() toolbarButtonOverrides: any = {};
  @Input() height = 'calc(100vh - 32px)';
  @Input() width = '100%';

  @Output() mediaLoadStatus = new EventEmitter<ResponseType>();
  @Output() viewerException = new EventEmitter<ViewerException>();
  @Output() toolbarEventsOutput = new EventEmitter<ToolbarEventService>();

  @Input() enableAnnotations = false;
  @Input() showCommentSummary: Subject<boolean>;
  @Input() annotationApiUrl;
  @Input() language;

  annotationSet: Observable<AnnotationSet>;

  constructor(
    public readonly toolbarButtons: ToolbarButtonVisibilityService,
    public readonly toolbarEvents: ToolbarEventService,
    private readonly api: AnnotationApiService,
    private readonly translate: TranslateService
  ) {
    if (this.annotationApiUrl) {
      api.annotationApiUrl = this.annotationApiUrl;
    }
    translate.addLangs(Object.values(Languages));
    translate.setDefaultLang(this.language);
    translate.use(this.language);
  }

  ngAfterContentInit() {
    this.setToolbarButtons();
    this.toolbarEventsOutput.emit(this.toolbarEvents);
  }

  contentTypeUnsupported(): boolean {
    return this.contentType === null || !Object.keys(SupportedContentTypes).includes(this.contentType.toUpperCase());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.annotationApiUrl) {
      this.api.annotationApiUrl = this.annotationApiUrl;
    }
    if (changes.url) {
      this.toolbarEvents.reset();
      if (this.enableAnnotations) {
        this.annotationSet = this.api.getOrCreateAnnotationSet(this.url);
      }
    }
    if (changes.enableAnnotations && this.enableAnnotations) {
      this.annotationSet = this.api.getOrCreateAnnotationSet(this.url);
    }
    if (changes.language) {
      this.setLanguage(changes.language.currentValue);
    }
    this.setToolbarButtons();
  }

  onMediaLoad(status: ResponseType) {
    this.mediaLoadStatus.emit(status);
  }

  setToolbarButtons() {
    if (this.contentType === SupportedContentTypes.PDF) {
      this.toolbarButtons.setup({
        ...defaultPdfOptions, showHighlightButton: this.enableAnnotations, showDrawButton: this.enableAnnotations,
        ...this.toolbarButtonOverrides
      });
    } else if (this.contentType === SupportedContentTypes.IMAGE) {
      this.toolbarButtons.setup({
        ...defaultImageOptions, showDrawButton: this.enableAnnotations,
        ...this.toolbarButtonOverrides
      });
    } else {
      this.toolbarButtons.setup({
        ...defaultUnsupportedOptions,
        ...this.toolbarButtonOverrides
      });
    }
  }

  setLanguage(language: string) {
    if (!this.translate.getLangs().includes(language)) {
      throw new Error('Language not available - choose from list of available languages');
    }
    this.language = language;
    this.translate.use(language);
  }

  onLoadException(exception: ViewerException) {
    this.viewerException.emit(exception);
  }
}

enum SupportedContentTypes {
  PDF = 'pdf',
  IMAGE = 'image'
}

enum Languages {
  ENGLISH = 'en',
  WELSH = 'cy'
}
