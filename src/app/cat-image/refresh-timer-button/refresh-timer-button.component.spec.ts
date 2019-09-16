import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTimerButtonComponent } from './refresh-timer-button.component';

describe('RefreshTimerButtonComponent', () => {
    let component: RefreshTimerButtonComponent;

    beforeEach(() => {
        component = new RefreshTimerButtonComponent();
    });

    describe('inform about refreh', () => {
        it('should inform about new interval', () => {
            component.setInterval(5);
            component.newInterval.subscribe((interval) => {
                expect(interval).toEqual(5);
            });
        });
    });
});
