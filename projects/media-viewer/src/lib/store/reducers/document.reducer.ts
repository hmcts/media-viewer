import * as fromActions from '../actions/document.action';

export interface DocumentState {
  documentId: string;
  pages: {[id: string]: DocumentPages};
  loaded: boolean;
  loading: boolean;
}

export interface DocumentPages {
 numberOfPages: number;
 styles: { left: number, height: number, width: number };
 scaleRotation: { scale: string; rotation: string };
}

export const initialDocumentState: DocumentState = {
  documentId: undefined,
  pages: {
    '0': {
      numberOfPages: 0,
      styles: {} as any,
      scaleRotation: {} as any
    }
  },
  loading: false,
  loaded: false,
};

export function docReducer (state = initialDocumentState,
                            action: fromActions.DocumentActions): DocumentState {

  switch (action.type) {

    case fromActions.SET_DOCUMENT_ID : {
      let url = action.payload.split('/documents/');
      const documentId = (url.length > 1 ? url[1] : url[0]).replace('/binary', '');
      return {
        ...state,
        documentId
      }
    }

    case fromActions.ADD_PAGE: {
      const payload = action.payload;
      const styles = {
        left: payload.div['offsetLeft'],
        height: payload.div['offsetHeight'],
        width: payload.div['offsetWidth']
      };
      const scaleRotation = {
        scale: payload.scale,
        rotation: payload.rotation
      };
      const page = {
        styles,
        scaleRotation
      };

      const pages = {
        ...state.pages,
        [payload.pageNumber]: page
      };

      return {
        ...state,
        pages
      };
    }
  }
  return state;
}
export const getDocPages = (state: DocumentState) => state.pages;
export const getDocId = (state: DocumentState) => state.documentId;

