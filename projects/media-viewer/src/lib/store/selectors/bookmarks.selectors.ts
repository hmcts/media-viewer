import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBookmarks from '../reducers/bookmarks.reducer';
import { Bookmark } from '../reducers';

export const getBookmarkState = createSelector(
  fromFeature.getMVState,
  (state: fromFeature.State) =>  state.bookmarks
);

export const getBookmarkEntities = createSelector(
  getBookmarkState,
  fromBookmarks.getBookmarkEnts
);

export const getAllBookmarks = createSelector(
  getBookmarkEntities,
  (entities: { [id: string]: Bookmark }) => Object.keys(entities).map(id => entities[id])
);

export const getEditableBookmark = createSelector(
  getBookmarkState,
  fromBookmarks.getEditBookmark
);
