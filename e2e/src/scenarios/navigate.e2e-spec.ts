import { NavigatePage } from '../pages/navigate.po';

describe('Media Viewer PDF Scenarios ', () => {
  let page: NavigatePage;

  beforeEach(async () => {
    page = new NavigatePage();
  });

  it('should display next page in pdf viewer', async () => {
    page.selectPdfViewer();
    await page.waitForPdfToLoad();

    await page.goToNextPage();

    expect(page.number()).toEqual('2');

    await page.goToPreviousPage();

    expect(page.number()).toEqual('1');
  });
});
