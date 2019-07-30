import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToolbarButtonVisibilityService } from './toolbar/toolbar-button-visibility.service';
import { AnnotationSet } from './annotations/annotation-set/annotation-set.model';
import { ToolbarEventService } from './toolbar/toolbar-event.service';

@Component({
  selector: 'mv-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['styles/main.scss', './media-viewer.component.scss']
})
export class MediaViewerComponent implements OnChanges {

  @Input() url: string;
  @Input() downloadFileName: string;
  @Input() contentType: string;
  @Input() showToolbar = true;

  @Output() mediaLoadStatus = new EventEmitter<string>();

  @Input() enableAnnotations = false;
  @Input() showCommentSummary: Subject<boolean>;
  @Input() annotationSet: Observable<AnnotationSet>;

  private supportedContentTypes = ['pdf', 'image'];

  constructor(
    public readonly toolbarButtons: ToolbarButtonVisibilityService,
    public readonly toolbarEvents: ToolbarEventService
  ) {}

  contentTypeUnsupported(): boolean {
    return this.supportedContentTypes.indexOf(this.contentType) < 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.url) {
      this.toolbarEvents.reset();
    }
  }

  onMediaLoad(status: string) {
    this.mediaLoadStatus.emit(status);
  }
}
