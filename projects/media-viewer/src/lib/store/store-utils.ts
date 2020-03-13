import {Annotation} from '../annotations/annotation-set/annotation-view/annotation.model';
import {Rectangle} from '../annotations/annotation-set/annotation-view/rectangle/rectangle.model';

export class StoreUtils {

  static generatePageEntities(annotations): {[id: string]: Annotation[]} {
    return annotations.reduce((h, obj) =>
      Object.assign(h, { [obj.page]:( h[obj.page] || [] ).concat(obj) }), {});
  }

  static generateCommentsEntities(annotations): {[id: string]: Annotation[]} {
     return annotations.reduce(
      (commentEntities: { [id: string]: Annotation }, annotation: Annotation) => {
        console.log(annotation)
        if (annotation.comments.length) {
          const comment = {
            ...annotation.comments[0],

          }
          return {
            ...commentEntities,
            [annotation.id]: comment
          };
        }
        return {
          ...commentEntities
        };
      }, {});
  }

  static generateAnnotationEntities(annotation): {[id: string]: Annotation[]} {
    return annotation.reduce(
      (annoEntities: { [id: string]: Annotation }, annotation: Annotation) => {
        const anno = {
          page: annotation.page,
          positionTop: annotation.rectangles[0].y
        }
        return {
          ...annoEntities,
          [annotation.id]: anno
        };
      }, {});
  }

  static scaleRotateAnno(annotations, scaleRotate, styles) {
      const annot = annotations.map(anno => {
          const rectangles = [this.scaleRotateRectangles(anno, scaleRotate, styles)];
          return {
              ...anno,
              rectangles
          }
      })
      return this.generatePageEntities(annot)
  }

  static scaleRotateRectangles(anno, zoom, styles) {
      let rectangle = {...anno.rectangles[0]}
      const height = rectangle.height / zoom.scale;
      const width = rectangle.width / zoom.scale;
      // const top = (rectangle.top - parentRect.top) / zoom.scale;
      // const left = (rectangle.left - parentRect.left) / zoom.scale;
      // debugger
      switch (zoom.rotation) {
          case 90:
              // rectangle.width = height;
              // rectangle.height = width;
              // rectangle.x = top;
              // rectangle.y = (pageHeight/zoom) - left - width;
              break;
          case 180:
              // rectangle.x = (pageWidth/zoom) - left - width;
              // rectangle.y = (pageHeight/zoom) - top - height;
              break;
          case 270:
              rectangle.width = height;
              rectangle.height = width;
              rectangle.x =  (rectangle.y)
              rectangle.y = (rectangle.x + width) - styles.height;
              break;
          default:
              rectangle
      }
      return rectangle as Rectangle;
  }

}