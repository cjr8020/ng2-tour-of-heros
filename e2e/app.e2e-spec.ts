import { Ng2TourOfHerosPage } from './app.po';

describe('ng2-tour-of-heros App', function() {
  let page: Ng2TourOfHerosPage;

  beforeEach(() => {
    page = new Ng2TourOfHerosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
