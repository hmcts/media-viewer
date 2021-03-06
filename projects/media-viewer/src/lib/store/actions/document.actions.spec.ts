import * as fromDocument from './document.actions';

describe('Document actions', () => {

    it('should create AddPages action', () => {
      const payload = [{div: {}, scale: 1, rotation: 0, id: '1', viewportScale: 1.333333}];
      const action = new fromDocument.AddPages(payload);
      expect({ ...action }).toEqual({
        type: fromDocument.ADD_PAGES,
        payload
      });
    });

    it('should create Convert action', () => {
      const payload = 'docId';
      const action = new fromDocument.Convert(payload);
      expect({...action}).toEqual({
        type: fromDocument.CONVERT,
        payload
      });
    });

    it('should create ConvertSuccess', () => {
      const payload = 'url';
      const action = new fromDocument.ConvertSuccess(payload);
      expect({...action}).toEqual({
        type: fromDocument.CONVERT_SUCCESS,
        payload
      });
    });

    it('should create ConvertFailure', () => {
      const payload = '';
      const action = new fromDocument.ConvertFailure(payload);
      expect({...action}).toEqual({
        type: fromDocument.CONVERT_FAIL,
        payload
      });
    });

    it('should create ClearConvertDocUrl', () => {
      const action = new fromDocument.ClearConvertDocUrl();
      expect({...action}).toEqual({
        type: fromDocument.CLEAR_CONVERT_DOC_URL
      });
    });
});
