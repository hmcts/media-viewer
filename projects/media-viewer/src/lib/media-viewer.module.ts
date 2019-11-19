import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { PdfViewerComponent } from './viewers/pdf-viewer/pdf-viewer.component';
import { ImageViewerComponent } from './viewers/image-viewer/image-viewer.component';
import { UnsupportedViewerComponent } from './viewers/unsupported-viewer/unsupported-viewer.component';
import { MediaViewerComponent } from './media-viewer.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { PdfJsWrapperFactory } from './viewers/pdf-viewer/pdf-js/pdf-js-wrapper.provider';
import { AnnotationsModule } from './annotations/annotations.module';
import { ErrorMessageComponent } from './viewers/error-message/error.message.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    ToolbarModule,
    AnnotationsModule
  ],
  declarations: [
    PdfViewerComponent,
    ImageViewerComponent,
    UnsupportedViewerComponent,
    MediaViewerComponent,
    ErrorMessageComponent
  ],
  entryComponents: [
    PdfViewerComponent,
    ImageViewerComponent,
    UnsupportedViewerComponent,
    ErrorMessageComponent
],
  providers: [
    PdfJsWrapperFactory
  ],
  exports: [
    MediaViewerComponent
]
})
export class MediaViewerModule { }

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
