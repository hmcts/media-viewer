import * as fromAnnotations from '../actions/annotations.action';
import * as fromTags from '../actions/tags.actions';
import {StoreUtils} from '../store-utils';
import {Annotation} from '../../annotations/annotation-set/annotation-view/annotation.model';

export interface TagsState {
  tagNameEnt: {[id: string]: string[]};
  filteredComments: {[id: string]: string[]};
  filteredPageEntities: {[id: string]: Annotation[]};
  annotations: Annotation[];
  filters: string[];
}

export const initialTagState: TagsState = {
  tagNameEnt: {},
  annotations: [],
  filteredPageEntities: {},
  filteredComments: {},
  filters: []
};

export function tagsReducer (
  state = initialTagState,
  action: fromAnnotations.AnnotationsActions | fromTags.TagsActions
): TagsState {
  switch (action.type) {
    case fromAnnotations.LOAD_ANNOTATION_SET_SUCCESS: {
      const annotations = action.payload.annotations;
      const tagNameEnt = StoreUtils.genTagNameEntities(annotations);
      return {
        ...state,
        tagNameEnt,
        annotations
      };
    }

    case fromAnnotations.SAVE_ANNOTATION_SUCCESS: {
      const payload = action.payload;

      const anno = [...state.annotations].filter(a => a.id !== payload.id);
      const annotation = [...anno, payload];
      const tagNameEnt =  StoreUtils.genTagNameEntities(annotation);
      return {
        ...state,
        tagNameEnt
      };
    }

    case fromTags.ADD_FILTER_TAGS: {
      const payload = action.payload;

      const filters = Object.keys(payload).reduce((arr: string[], key: string) => {
        return payload[key] ? [...arr, key] : arr;
      }, []);

      const filteredComments = filters.reduce((obj: {[id: string]: string}, f) => {
        return {
          ...obj,
          ...state.tagNameEnt[f]
        }
      }, {});

      const annotations = Object.keys(filteredComments).map(key => state.annotations.filter(a => a.id === key)[0]);
      const filteredPageEntities = StoreUtils.groupByKeyEntities(annotations, 'page');
      return {
        ...state,
        filters,
        filteredComments,
        filteredPageEntities
      };
    }

  }
  return state;
}

export const getTagNameEnt = (state: TagsState) => state.tagNameEnt;
export const getFilters = (state: TagsState) => state.filters;
export const getFilteredComments = (state: TagsState) => state.filteredComments;
export const getFilteredPageEnt = (state: TagsState) => state.filteredPageEntities;


