import { Component, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { EmLoggerService } from '../../../logging/em-logger.service';
import {DownloadOperation, PrintOperation, RotateOperation, ZoomOperation} from '../../media-viewer.model';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent {

  @Input() url: string;
  @Input() downloadFileName: string;
  @Input() originalUrl: string;
  @ViewChild('img') img: ElementRef;
  rotation = 0;

  constructor(private renderer: Renderer2,
              private log: EmLoggerService) {
  }


  @Input()
  set rotateOperation(operation: RotateOperation) {
      this.rotation = this.rotation + operation.rotation;
      this.rotateImage();
  }

  @Input()
  set zoomOperation(operation: ZoomOperation) {

  }

  @Input()
  set printOperation(printOperation: PrintOperation) {
    if (printOperation) {
      const printWindow = window.open(this.url);
      printWindow.print();
    }
  }

  @Input()
  set downloadOperation(downloadOperation: DownloadOperation) {
    if (downloadOperation) {
      // TODO
    }
  }

  private rotateImage() {
    this.log.info('rotating to-' + this.rotation + 'degrees');
    const styles = ['transform', '-ms-transform', '-o-transform', '-moz-transform', '-webkit-transform'];
    for (const style of styles) {
      this.renderer.setStyle(this.img.nativeElement, style, `rotate(${this.rotation}deg)`);
    }
  }
}
