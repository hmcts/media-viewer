import {Injectable, QueryList} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentSetComponent } from '../comment-set.component';
import {CommentComponent} from "./comment.component";

@Injectable()
export class CommentService {

  public readonly unsavedChanges = new Subject<boolean>();
  commentSets: CommentSetComponent[];

  constructor() {
    this.commentSets = [];
  }

  onCommentChange(changes: boolean): void {
    this.unsavedChanges.next(changes);
  }

  getUnsavedChanges(): Observable<boolean> {
    return this.unsavedChanges.asObservable();
  }

  resetCommentSet() {
    this.commentSets = [];
  }

  updateCommentSets(index: number, commentSetComponent: CommentSetComponent) {
    this.commentSets[index] = commentSetComponent;
  }

  allCommentSetsSaved(commentComponents: QueryList<CommentComponent>) {
    this.onCommentChange(commentComponents.some(comment => comment.editable === true) &&
      this.commentSets.some(commentSet => commentSet.allCommentsSavedInSet()));
  }
}
