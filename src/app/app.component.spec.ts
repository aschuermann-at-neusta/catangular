import { async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;

    beforeEach(async(() => {
        component = new AppComponent();
    }));

    it('should have one meaningless test', () => {
        expect(component).toBeDefined();
    });
});
