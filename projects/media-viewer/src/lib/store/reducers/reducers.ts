import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromDocument from './document.reducer';
import * as fromAnnotation from './annotations.reducer';
import * as fromTags from './tags.reducer';
import * as fromBookmarks from './bookmarks.reducer';
import * as fromRedaction from './redaction.reducer';
import * as fromIcp from './icp.reducer';
import { IcpState } from '../../icp/icp.interfaces';

export interface State {
  document: fromDocument.DocumentState;
  annotations: fromAnnotation.AnnotationSetState;
  tags: fromTags.TagsState;
  bookmarks: fromBookmarks.BookmarksState;
  redactions: fromRedaction.RedactionState;
  icp: IcpState;
}

export const reducers: ActionReducerMap<State> = {
  document: fromDocument.docReducer,
  annotations: fromAnnotation.reducer,
  tags: fromTags.tagsReducer,
  bookmarks: fromBookmarks.bookmarksReducer,
  redactions: fromRedaction.redactionReducer,
  icp: fromIcp.icpReducer,
};

export const getMVState = createFeatureSelector<State>('media-viewer');

export * from './document.reducer';
export * from './annotations.reducer';
export * from './tags.reducer';
export * from './bookmarks.reducer';
export * from './redaction.reducer';
export * from './icp.reducer';
