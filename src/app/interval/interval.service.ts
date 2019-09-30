import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IntervalService {

    constructor() {
    }

    private interval: Subject<boolean> = new Subject<boolean>();
    interval$: Observable<boolean> = this.interval.asObservable();

    handler: any;

    setTime(seconds: number) {
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


}
