import { fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { AutoRefreshService } from './auto-refresh.service';
import { IntervalService } from './interval.service';

describe('AutoRefreshService', () => {
    let mockIntervalService: IntervalService;
    let autoRefreshService: AutoRefreshService;
    const controlSubject: Subject<boolean> = new Subject<boolean>();


    beforeEach(() => {
        mockIntervalService = mock(IntervalService);
        autoRefreshService = new AutoRefreshService(instance(mockIntervalService));
        when(mockIntervalService.interval$).thenReturn(controlSubject);

    });
    //
    // afterEach(() => {
    //     clearInterval(autoRefreshService.handler);
    // });

    it('should set time in interval service', () => {
        autoRefreshService.setTime(5, () => {
        });
        verify(mockIntervalService.setTime(5)).once();
        clearInterval(autoRefreshService.handler);
    });

    it('should call the callback function', () => {
        let called = false;
        autoRefreshService.setTime(5, () => {
            called = true;
        });
        controlSubject.next(true);
        expect(called).toBe(true);
        clearInterval(autoRefreshService.handler);
    });

    it('should return the remaining time every seconds', fakeAsync(() => {
        autoRefreshService.setTime(5, () => {
        });
        let timeLeft: number = 0;
        autoRefreshService.timeLeft$.subscribe(t => timeLeft = t);
        tick(1000);
        expect(timeLeft).toBe(4);
        controlSubject.next(true);
        clearInterval(autoRefreshService.handler);
    }));

    fit('should return always the remaining time', fakeAsync(() => {
        autoRefreshService.setTime(5, () => {
        });
        let timeLeft = 0;
        autoRefreshService.timeLeft$.subscribe(t => timeLeft = t);
        tick(6000);
        expect(timeLeft).toBe(4);
        controlSubject.next(true);
        tick(1000);
        clearInterval(autoRefreshService.handler);
    }));
});
