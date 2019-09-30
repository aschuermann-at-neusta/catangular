import { fakeAsync, tick } from '@angular/core/testing';
import { IntervalService } from './interval.service';

describe('IntervalService', () => {
    let service: IntervalService;

    beforeEach(() => {
        service = new IntervalService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to set timer', () => {
        expect(service.interval$).toBeDefined();
    });

    it('should inform if interval has reached', fakeAsync(() => {
        let control = false;
        service.interval$.subscribe(() => {
            control = true;
        });
        service.setTime(1);
        tick(500);
        expect(control).toBe(false);
        tick(500);
        expect(control).toBe(true);
        service.stopInterval();
    }));

    it('should clear old handler if already exists', () => {
        let cleared = 0;
        const backup = service.stopInterval;
        service.stopInterval = () =>  cleared++;
        service.setTime(1);
        service.setTime(2);
        expect(cleared).toBe(2);
        service.stopInterval = backup;
    });
});
