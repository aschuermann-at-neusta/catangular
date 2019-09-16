import { CatRefreshButtonComponent } from './cat-refresh-button.component';

describe('CatRefreshButtonComponent', () => {
  let component: CatRefreshButtonComponent;

  beforeEach(() => {
      component = new CatRefreshButtonComponent();
  });

    describe('refresh trigger', () => {
        it('should tell about click on refresh button', (done) => {
            component.refreshClicked.subscribe((c: boolean) => {
                expect(c).toBe(true);
                done();
            });
            component.refresh();
        });
    });
});
