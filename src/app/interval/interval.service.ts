import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IntervalService {

    private interval: Subject<boolean> = new Subject<boolean>();
    private seconds: number;

    interval$: Observable<boolean> = this.interval.asObservable();

    handler: any;

    setTime(seconds: number) {
        this.seconds = seconds;
        this.stopInterval();
        this.handler = setInterval(() => {
            this.interval.next(true);
        }, seconds * 1000);
    }

    stopInterval() {
        if (this.handler) {
            clearInterval(this.handler);
        }
    }

    reset() {
        this.setTime(this.seconds);
    }
}
