import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTimerButtonComponent } from './refresh-timer-button.component';

describe('RefreshTimerButtonComponent', () => {
    let component: RefreshTimerButtonComponent;

    beforeEach(() => {
        component = new RefreshTimerButtonComponent();
    });

    describe('inform about refreh', () => {
        it('should inform about new interval', (done) => {
            component.newInterval.subscribe((interval) => {
                expect(interval).toEqual(5);
                done();
            });
            component.setInterval(5);
        });
    });
    describe('stop interval', () => {
        it('should inform about stop', (done) => {
            component.stopClicked.subscribe(() => {
                done();
            });
            component.stopInterval();
        });
    });
});
