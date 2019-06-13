import { AnnotationComponent } from './annotation.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment/comment.component';
import { RectangleComponent } from './rectangle/rectangle.component';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';
import { annotationSet } from '../../assets/annotation-set';
import { DebugElement } from '@angular/core';
import { Subject } from 'rxjs';

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [
        AnnotationComponent,
        CommentComponent,
        RectangleComponent
      ],
      imports: [
        FormsModule,
        AngularDraggableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationComponent);
    component = fixture.componentInstance;
    component.annotation = annotationSet.annotations[0];
    component.selectedAnnotation = new Subject<string>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('select the annotation', async () => {
    spyOn(component.selectedAnnotation, 'next');

    component.selectAnnotation();

    expect(component.selectedAnnotation.next).toHaveBeenCalledWith(component.annotation.id);
  });

  it('deletes a comment', async () => {
    spyOn(component.update, 'emit');

    component.deleteComment();

    expect(component.annotation.comments.length).toBe(0);
    expect(component.update.emit).toHaveBeenCalledWith(component.annotation);
  });
});
