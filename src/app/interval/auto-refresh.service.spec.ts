import { fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { AutoRefreshService } from './auto-refresh.service';
import { CountdownService } from './countdown.service';
import { IntervalService } from './interval.service';

describe('AutoRefreshService', () => {
    let mockIntervalService: IntervalService;
    let mockCountdownService: CountdownService;
    let autoRefreshService: AutoRefreshService;
    const controlSubject: Subject<boolean> = new Subject<boolean>();


    beforeEach(() => {
        mockIntervalService = mock(IntervalService);
        mockCountdownService = mock(CountdownService);
        autoRefreshService = new AutoRefreshService(
            instance(mockIntervalService),
            instance(mockCountdownService)
        );
        when(mockIntervalService.interval$).thenReturn(controlSubject);

    });

    it('should set time in interval service', () => {
        autoRefreshService.setTime(5, () => {
        });
        verify(mockIntervalService.setTime(5)).once();
    });

    it('should call the callback function', () => {
        let called = false;
        autoRefreshService.setTime(5, () => {
            called = true;
        });
        controlSubject.next(true);
        expect(called).toBe(true);
    });

    it('should start countdown', fakeAsync(() => {
        autoRefreshService.setTime(5, () => {
        });
        verify(mockCountdownService.setCount(5)).once();
    }));

    it('should reset the countdown', fakeAsync(() => {
        autoRefreshService.setTime(5, () => {
        });
        tick(6000);
        controlSubject.next(true);
        verify(mockCountdownService.setCount(5)).twice();
    }));

    it('should stop the interval', () => {
        autoRefreshService.setTime(5, () => {
        });
        autoRefreshService.stopRefresh();
        verify(mockIntervalService.stopInterval()).once();
    });

    it('should stop the countdown', () => {
        autoRefreshService.setTime(5, () => {
        });
        autoRefreshService.stopRefresh();
        verify(mockCountdownService.stopCount()).once();
    });

    it('should reset the countdown on reset', () => {
        autoRefreshService.setTime(5, () => {
        });
        autoRefreshService.reset();
        verify(mockCountdownService.reset()).once();
    });

    it('should reset the interval on reset', () => {
        autoRefreshService.setTime(5, () => {
        });
        autoRefreshService.reset();
        verify(mockIntervalService.reset()).once();
    });
});
