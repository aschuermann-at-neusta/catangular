import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CountdownService } from './countdown.service';
import { IntervalService } from './interval.service';

@Injectable({
    providedIn: 'root'
})
export class AutoRefreshService {
    public timeLeft$: Observable<number> = this.countdownService.count$;

    constructor(
        private intervalService: IntervalService,
        private countdownService: CountdownService) {
    }

    setTime(seconds: number, callback: any) {
        this.countdownService.setCount(seconds);
        this.intervalService.setTime(seconds);
        this.intervalService.interval$.subscribe(_ => {
            callback();
            this.countdownService.setCount(seconds);
        });
    }

    stopRefresh() {
        this.intervalService.stopInterval();
        this.countdownService.stopCount();
    }

    reset() {
        this.countdownService.reset();
        this.intervalService.reset();
    }
}
