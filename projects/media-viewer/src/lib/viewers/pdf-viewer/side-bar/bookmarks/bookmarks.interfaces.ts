export interface BookmarksState {
  bookmarks: Bookmark[],
  bookmarkEntities: { [id: string]: Bookmark },
  editableBookmark: string,
  loaded: boolean,
  loading: boolean
}

export interface Bookmark {
  id: string;
  documentId: string;
  name: string;
  pageNumber: number;
  xCoordinate: number;
  yCoordinate: number;
  children: any[];
  previous: string;
  index: number;
}

export interface BookmarkMoveEvent {
  node: Bookmark,
  from: {
    parent: string,
    next: Bookmark
  };
  to: {
    parent: string,
    previous: string,
    next: Bookmark
  };
}

export interface PdfPosition {
  pageNumber: number;
  top: number;
  left: number;
  rotation: number;
}
