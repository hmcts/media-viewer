import {ViewerEventService} from './viewer-event.service';

describe('Viewer Events Service', () => {
  let service: ViewerEventService;

  const mockHighLight: any = {
    page : 2
  };

  beforeEach(() => {
    service = new ViewerEventService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should select the text', () => {
    const textSelectSpy = spyOn(service.textHighlight, 'next');
    service.textSelected(mockHighLight);

    expect(textSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should select the Shape', () => {
    const shapeSelectSpy = spyOn(service.boxHighlight, 'next');
    service.boxSelected(mockHighLight);

    expect(shapeSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear the context toolbar', () => {
    spyOn(service.ctxToolbarCleared, 'next');

    service.clearCtxToolbar();

    expect(service.ctxToolbarCleared.next).toHaveBeenCalled();
  });
});
