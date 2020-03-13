import { Action } from '@ngrx/store';
import {Annotation} from '../../annotations/annotation-set/annotation-view/annotation.model';
import {PageEvent} from '../../viewers/pdf-viewer/pdf-js/pdf-js-wrapper';

export const LOAD_ANNOTATION_SET = '[Annotations] Load Annotation Set';
export const LOAD_ANNOTATION_SET_SUCCESS = '[Annotations] Load Annotation Set Success';
export const LOAD_ANNOTATION_SET_FAIL = '[Annotations] Load Annotation Set Fail';

export const SAVE_ANNOTATION = '[Annotations] Save Annotation';
export const SAVE_ANNOTATION_SUCCESS = '[Annotations] Save Annotation Success';
export const SAVE_ANNOTATION_FAIL = '[Annotations] Save Annotation Fail';
export const ADD_OR_EDIT_COMMENT = '[Annotations] Add or Edit Comment';

export const ADD_PAGE = '[Annotations] Add Page';


export class LoadAnnotationSet implements Action {
  readonly type = LOAD_ANNOTATION_SET;
  constructor(public payload: string) { }
}

export class LoadAnnotationSetSucess implements Action {
  readonly type = LOAD_ANNOTATION_SET_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadAnnotationSetFail implements Action {
  readonly type = LOAD_ANNOTATION_SET_FAIL;
  constructor(public payload: any) { }
}

export class SaveAnnotation implements Action {
  readonly type = SAVE_ANNOTATION;
  constructor(public payload: any) { }
}

export class SaveAnnotationSuccess implements Action {
  readonly type = SAVE_ANNOTATION_SUCCESS;
  constructor(public payload: any) { }
}

export class SaveAnnotationFail implements Action {
  readonly type = SAVE_ANNOTATION_FAIL;
  constructor(public payload: any) { }
}

export class AddOrEditComment implements Action {
  readonly type = ADD_OR_EDIT_COMMENT;
  constructor(public payload: Annotation) { }
}

export class AddPage implements Action {
  readonly type = ADD_PAGE;
  constructor(public payload: any) { }
}


export type AnnotationsActions =
  | LoadAnnotationSet
  | LoadAnnotationSetSucess
  | LoadAnnotationSetFail
  | SaveAnnotation
  | SaveAnnotationSuccess
  | SaveAnnotationFail
  | AddOrEditComment
  | AddPage;