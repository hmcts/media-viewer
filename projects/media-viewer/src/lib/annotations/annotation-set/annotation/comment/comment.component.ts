import {Component, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Comment } from './comment.model';
import { User } from '../../../user/user.model';
import {Rectangle} from '../rectangle/rectangle.model';

@Component({
  selector: 'mv-anno-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  private readonly MAX_COMMENT_LENGTH = 50;

  lastUpdate: string;
  fullComment: string;
  author: User;
  editor: User;

  @Output() click = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() updated = new EventEmitter<String>();
  @Input() selected: boolean;
  @Input() editable: boolean;
  @Input() rotate = 0;
  @Input() zoom = 1;
  @Input() rectangle: Rectangle;
  @ViewChild('form') form: ElementRef;

  @Input()
  set comment(comment: Comment) {
    this.lastUpdate = comment.lastModifiedDate ? comment.lastModifiedDate : comment.createdDate;
    this.author = comment.createdByDetails;
    this.editor = comment.lastModifiedByDetails;
    this.fullComment = comment.content;
  }

  onEdit() {
    this.editable = true;
  }

  onCancel() {
    this.editable = false;
  }

  public onDelete() {
    this.delete.emit();
  }

  public onSave() {
    this.updated.emit(this.fullComment);
    this.editable = false;
  }

  onCommentClick() {
    this.click.emit();
  }

  get commentText() {
    return !this.selected && this.fullComment.length > this.MAX_COMMENT_LENGTH
      ? this.fullComment.substring(0, this.MAX_COMMENT_LENGTH - 3) + '...'
      : this.fullComment;
  }

  set commentText(text: string) {
    this.fullComment = text;
  }

  formNgStyle() {
    if (this.rotate === 0) {
      return {
        top: (this.rectangle.y * this.zoom) + 'px',
        left: this.getFirstNonNullParentProperty(this.form.nativeElement, 'clientWidth') + 'px'
      };
    } else if (this.rotate === 90) {
      return {
        top: '0px',
        left: this.rectangle.x * this.zoom + 'px',
        'transform-origin': 'top left'
      };
    } else if (this.rotate === 180) {
      return {
        top: ((this.rectangle.y * this.zoom) + (this.rectangle.height * this.zoom)) + 'px',
        left: '0px',
        'transform-origin': 'top left'
      };
    } else if (this.rotate === 270) {
      return {
        top: this.getFirstNonNullParentProperty(this.form.nativeElement, 'clientHeight') + 'px',
        left: (this.rectangle.x * this.zoom) + (this.rectangle.width * this.zoom) + 'px',
        'transform-origin': 'top left'
      };
    }
    return null;
  }

  commentStyle() {
    return [
      'aui-comment__content',
      'form-control',
      'mimic-focus',
      !this.editable ? 'view-mode' : 'edit-mode',
      !this.selected ? 'collapsed' : 'expanded',
    ];
  }

  private getFirstNonNullParentProperty(el: Node, property: string) {
    return !el.parentNode ? null : ( el.parentNode[property] ?
      el.parentNode[property] : this.getFirstNonNullParentProperty(el.parentNode, property));
  }
}
